import { Component, HostListener, afterNextRender, signal } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { IconComponent } from '../../shared/icon/icon.component';
import { LangDropdownComponent } from '../../shared/lang-dropdown/lang-dropdown.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { ProblemSectionComponent } from './problem-section/problem-section.component';
import { HowSectionComponent } from './how-section/how-section.component';
import { DemoSectionComponent } from './demo-section/demo-section.component';

interface LandingFeature {
  icon: string;
  titleKey: string;
  descKey: string;
}

interface Testimonial {
  quoteKey: string;
  whoKey: string;
}

const DEMO_MAILTO = 'mailto:hello@guestify.ge?subject=' + encodeURIComponent('Guestify — დემოს მოთხოვნა');

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
    HeroSectionComponent,
    ProblemSectionComponent,
    HowSectionComponent,
    DemoSectionComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  protected readonly demoMailto = DEMO_MAILTO;

  protected readonly features: LandingFeature[] = [
    { icon: 'qr_code_2', titleKey: 'landing_feat1_title', descKey: 'landing_feat1_desc' },
    { icon: 'edit_note', titleKey: 'landing_feat2_title', descKey: 'landing_feat2_desc' },
    { icon: 'language', titleKey: 'landing_feat3_title', descKey: 'landing_feat3_desc' },
    { icon: 'location_on', titleKey: 'landing_feat4_title', descKey: 'landing_feat4_desc' }
  ];

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

  protected readonly partnerPlaceholders = ['I', 'II', 'III', 'IV', 'V', 'VI'];

  protected readonly mobileMenuOpen = signal(false);

  constructor() {
    afterNextRender(() => {
      // რამდენი ტესტიმონიალი ჩანს ერთდროულად — 3 დესქტოპზე, 1 ვიწრო ეკრანზე
      const mq = window.matchMedia('(max-width: 719.98px)');
      const applyPerPage = () => {
        this.testiPerPage.set(mq.matches ? 1 : 3);
        this.testiIndex.update((i) => Math.min(i, this.testiMaxIndex()));
      };
      applyPerPage();
      mq.addEventListener('change', applyPerPage);
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
