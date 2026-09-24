import { Component, DestroyRef, ElementRef, HostListener, afterNextRender, effect, inject, signal, viewChild } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { IconComponent } from '../../shared/icon/icon.component';
import { LangDropdownComponent } from '../../shared/lang-dropdown/lang-dropdown.component';
import { RevealDirective } from '../../shared/directives/reveal.directive';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ProblemSectionComponent } from './problem-section/problem-section.component';
import { HowSectionComponent } from './how-section/how-section.component';
import { DemoSectionComponent } from './demo-section/demo-section.component';
import { FeaturesSectionComponent } from './features-section/features-section.component';
import { AiSectionComponent } from './ai-section/ai-section.component';
import { WhoSectionComponent } from './who-section/who-section.component';
import { BeforeAfterSectionComponent } from './before-after-section/before-after-section.component';
import { PricingSectionComponent } from './pricing-section/pricing-section.component';
import { FaqSectionComponent } from './faq-section/faq-section.component';
import { PartnersSectionComponent } from './partners-section/partners-section.component';

interface Testimonial {
  quoteKey: string;
  whoKey: string;
}

/**
 * საჯარო ლენდინგ გვერდი (root `/`) — Guestify-ის, როგორც პროდუქტის, პრეზენტაცია
 * პოტენციური სასტუმრო-კლიენტებისთვის. სრულიად დამოუკიდებელია სტუმრის guest-shell-ისგან
 * (რომელიც კონკრეტული სასტუმროს გვერდია `/hotel/:slug`-ზე).
 */
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    TranslatePipe,
    IconComponent,
    LangDropdownComponent,
    RevealDirective,
    HeroSectionComponent,
    ProblemSectionComponent,
    HowSectionComponent,
    DemoSectionComponent,
    FeaturesSectionComponent,
    AiSectionComponent,
    WhoSectionComponent,
    BeforeAfterSectionComponent,
    PricingSectionComponent,
    FaqSectionComponent,
    PartnersSectionComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  protected readonly testimonials: Testimonial[] = [
    { quoteKey: 'landing_testi1_quote', whoKey: 'landing_testi1_who' },
    { quoteKey: 'landing_testi2_quote', whoKey: 'landing_testi2_who' },
    { quoteKey: 'landing_testi3_quote', whoKey: 'landing_testi3_who' },
    { quoteKey: 'landing_testi4_quote', whoKey: 'landing_testi4_who' },
    { quoteKey: 'landing_testi5_quote', whoKey: 'landing_testi5_who' }
  ];

  /**
   * ტესტიმონიალების სლაიდერი — ერთდროულად რამდენიმე ჩანს (3 დესქტოპზე, 1 ვიწრო ეკრანზე),
   * მაგრამ ისარზე დაჭერით ერთი-ერთით იძვრის (window ჩამოცურდება, არა მთელი გვერდი).
   */
  protected readonly testiPerPage = signal(3);
  protected readonly testiIndex = signal(0);

  protected readonly mobileMenuOpen = signal(false);

  /**
   * topbar აღარაა .hero-screen-ის flex-column-ში (გატანილია sticky-ბაგის გამო — იხ.
   * template-ის კომენტარი), ამიტომ .hero-screen-ის 100dvh + topbar-ის საკუთარი სიმაღლე
   * ერთ ეკრანს სცდება და hero-ს ვერტიკალურად ცენტრირებული კონტენტი "მოწყვეტილად" გამოიყურება
   * (ჩანს, რომ scroll-ის შემდეგაც კვლავ იმავე სექციაშია). ResizeObserver რეალურად ზომავს
   * topbar-ის რენდერილ სიმაღლეს და .hero-screen საიდანაც სწორედ ამდენს აკლებს 100dvh-ს —
   * hardcode-ილი Npx-ის მაგივრად, რომელიც font-loading/ლოკალიზაციაზე დამოკიდებულებით
   * არასწორი გამოვიდოდა.
   */
  protected readonly topbarHeight = signal(64);
  private readonly topbarRef = viewChild<ElementRef<HTMLElement>>('topbarRef');

  /** სქროლის მდგომარეობა — topbar-ის კომპაქტური სტილისთვის და ზედა scroll-progress ზოლისთვის. */
  protected readonly scrolled = signal(false);
  protected readonly scrollProgress = signal(0);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // მობაილზე მთელ ეკრანზე გაშლილი მენიუა — ღიაობისას ფონური გვერდის სქროლი იბლოკება,
    // რომ მენიუს მიღმა კონტენტი არ "მოძრაობდეს" გარეთ swipe-ისას. ცალკე effect (და არა
    // toggleMobileMenu/closeMobileMenu-ში დუბლირება), რომ ყველა დამხურავმა გზამ
    // (outside-click, Escape, ბმულზე დაჭერა) ერთნაირად იმუშაოს.
    effect(() => {
      document.body.style.overflow = this.mobileMenuOpen() ? 'hidden' : '';
    });

    afterNextRender(() => {
      // რამდენი ტესტიმონიალი ჩანს ერთდროულად — 3 დესქტოპზე, 1 ვიწრო ეკრანზე
      const mq = window.matchMedia('(max-width: 719.98px)');
      const applyPerPage = () => {
        this.testiPerPage.set(mq.matches ? 1 : 3);
        this.testiIndex.update((i) => Math.min(i, this.testiMaxIndex()));
      };
      applyPerPage();
      mq.addEventListener('change', applyPerPage);

      const topbarEl = this.topbarRef()?.nativeElement;
      if (topbarEl) {
        const ro = new ResizeObserver(([entry]) => {
          if (entry) this.topbarHeight.set(Math.round(entry.contentRect.height));
        });
        ro.observe(topbarEl);
      }

      // topbar-ის კომპაქტური სტილი + ზედა scroll-progress ზოლი — rAF-ით გატროტლილი, რომ
      // scroll-ივენთმა (რომელიც ბრაუზერს ხშირად ეშვება) ზედმეტი layout/style ხელახლა არ გამოთვალოს.
      let ticking = false;
      const updateScroll = () => {
        const doc = document.documentElement;
        this.scrolled.set(doc.scrollTop > 8);
        const max = doc.scrollHeight - doc.clientHeight;
        this.scrollProgress.set(max > 0 ? Math.min(100, (doc.scrollTop / max) * 100) : 0);
        ticking = false;
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateScroll);
        }
      };
      updateScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }

  toggleMobileMenu(event: Event): void {
    event.stopPropagation();
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  /** click-outside — გარეთ დაჭერისას იხურება; toggle-ღილაკზე დაჭერა stopPropagation-ით არ აღწევს აქამდე. */
  @HostListener('document:click')
  closeMobileMenuOnOutsideClick(): void {
    this.mobileMenuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  closeMobileMenuOnEscape(): void {
    this.mobileMenuOpen.set(false);
  }

  testiMaxIndex(): number {
    return Math.max(0, this.testimonials.length - this.testiPerPage());
  }

  testiOffsetPercent(): number {
    return this.testiIndex() * (-100 / this.testiPerPage());
  }

  testiDotIndices(): number[] {
    return Array.from({ length: this.testiMaxIndex() + 1 }, (_, i) => i);
  }

  prevTesti(): void {
    this.testiIndex.update((i) => Math.max(0, i - 1));
  }

  nextTesti(): void {
    this.testiIndex.update((i) => Math.min(this.testiMaxIndex(), i + 1));
  }

  goTesti(i: number): void {
    this.testiIndex.set(Math.min(i, this.testiMaxIndex()));
  }
}
