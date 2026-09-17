import { Component, ElementRef, inject, viewChild } from '@angular/core';
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

  /**
   * .app-body (და არა document) სქროლავს გვერდს, ამიტომ Angular Router-ის ჩაშენებული
   * scroll-restoration (რომელიც window-ს ეხება) აქ არაფერს არ აკეთებს — ტაბებს შორის
   * (bottom-nav) გადართვისას ძველი სქროლ-პოზიცია რჩება, და მაგალითად Home-ზე დაბლა
   * ჩამოსქროლილს რომ AI-ზე გადახვიდე, header/idle-ის თავი აღარ ჩანს. ამიტომ ყოველ
   * ნავიგაციაზე თავად ვწევთ .app-body-ს თავში.
   */
  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.appBody()?.nativeElement.scrollTo({ top: 0, behavior: 'auto' }));
  }
}
