import { Component, ElementRef, effect, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';
import { LangDropdownComponent } from '../../../shared/lang-dropdown/lang-dropdown.component';

@Component({
  selector: 'app-guest-shell',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe, BottomNavComponent, LangDropdownComponent],
  templateUrl: './guest-shell.component.html',
  styleUrl: './guest-shell.component.scss'
})
export class GuestShellComponent {
  protected readonly hotelContext = inject(HotelContextService);
  private readonly router = inject(Router);
  private readonly appBody = viewChild<ElementRef<HTMLElement>>('appBody');

  /** header იმალება ჩამოსქროლვისას და ბრუნდება აწევისას — მისამართისთვის იხ. .app-header.hidden. */
  protected readonly headerHidden = signal(false);
  private lastScrollTop = 0;
  private accumulatedDelta = 0;
  private static readonly DIRECTION_THRESHOLD = 14;

  /**
   * .app-body (და არა document) სქროლავს გვერდს, ამიტომ Angular Router-ის ჩაშენებული
   * scroll-restoration (რომელიც window-ს ეხება) აქ არაფერს არ აკეთებს — ტაბებს შორის
   * (bottom-nav) გადართვისას ძველი სქროლ-პოზიცია რჩება, და მაგალითად Home-ზე დაბლა
   * ჩამოსქროლილს რომ AI-ზე გადახვიდე, header/idle-ის თავი აღარ ჩანს. ამიტომ ყოველ
   * ნავიგაციაზე თავად ვწევთ .app-body-ს თავში (და ვაჩენთ header-საც, თუ დამალული იყო).
   */
  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.appBody()?.nativeElement.scrollTo({ top: 0, behavior: 'auto' });
        this.lastScrollTop = 0;
        this.accumulatedDelta = 0;
        this.headerHidden.set(false);
      });

    // (scroll) template binding-ის ნაცვლად პირდაპირ addEventListener {passive:true}-ით —
    // non-passive scroll listener-ი mobile Safari-ს (და ზოგან Chrome-საც) მიაჩნია
    // "შესაძლოა scroll-ს ბლოკავს" და ამის გამო momentum-სქროლისას ივენთების
    // მიწოდებას აყოვნებს/თხელავს, რაც header-ის hide/show-ს დაუზუსტებელს/ჩამორჩენილს
    // ხდიდა რეალურ ტელეფონზე. effect()-ია და არა afterNextRender — .app-body
    // hotelContext.hotel()-ის ჩატვირთვამდე (@if-ის მიღმა) საერთოდ არ არსებობს
    // DOM-ში, ამიტომ ერთხელ-გაშვებული afterNextRender-ი ხშირად "undefined"-ს
    // წააწყდებოდა და listener-ს ვერასდროს ამაგრებდა — effect კი თავად
    // ხელახლა ეშვება, როცა viewChild სიგნალი მოგვიანებით მაინც განისაზღვრება.
    let listenerAttached = false;
    effect(() => {
      const el = this.appBody()?.nativeElement;
      if (!el || listenerAttached) return;
      listenerAttached = true;
      el.addEventListener('scroll', () => this.onBodyScroll(), { passive: true });
    });
  }

  /**
   * Facebook-ისმაგვარი ქცევა — ჩამოსქროლვისას header იმალება, აწევისას მაშინვე ბრუნდება
   * (თავში დაბრუნების საჭიროების გარეშე). ცალკეული scroll-ივენთის delta-ს ნაცვლად
   * ერთი მიმართულებით დაგროვილ delta-ს ვამოწმებთ (და ვშლით დაგროვებას მიმართულების
   * შეცვლაზე) — plain per-event threshold ხმაურიან/rubber-band scroll-ზე (რომელიც
   * ერთი დიდი გადახტომის მაგივრად პატარა, მიმართულებაცვლადი ნახტომების სერიად
   * "დაბრუნდება" ხოლმე) ყოველ ნაბიჯზე აციმციმებდა header-ს. თავთან ახლოს (<=8px)
   * ყოველთვის ჩანს.
   */
  protected onBodyScroll(): void {
    const top = this.appBody()?.nativeElement.scrollTop ?? 0;
    const delta = top - this.lastScrollTop;
    this.lastScrollTop = top;

    if (top <= 8) {
      this.headerHidden.set(false);
      this.accumulatedDelta = 0;
      return;
    }

    if (Math.sign(delta) !== Math.sign(this.accumulatedDelta)) {
      this.accumulatedDelta = 0;
    }
    this.accumulatedDelta += delta;

    if (this.accumulatedDelta > GuestShellComponent.DIRECTION_THRESHOLD) {
      this.headerHidden.set(true);
      this.accumulatedDelta = 0;
    } else if (this.accumulatedDelta < -GuestShellComponent.DIRECTION_THRESHOLD) {
      this.headerHidden.set(false);
      this.accumulatedDelta = 0;
    }
  }
}
