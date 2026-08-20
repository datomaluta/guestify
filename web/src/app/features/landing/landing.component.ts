import { Component, ElementRef, afterNextRender, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { ThemeService } from '../../core/theme.service';
import { AppLanguage } from '../../core/models';
import { IconComponent } from '../../shared/icon/icon.component';

interface LandingFeature {
  icon: string;
  titleKey: string;
  descKey: string;
}

interface LandingStep {
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
  imports: [TranslatePipe, IconComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  protected readonly language = inject(LanguageService);
  protected readonly theme = inject(ThemeService);
  private readonly elRef = inject(ElementRef<HTMLElement>);

  protected readonly demoMailto = DEMO_MAILTO;

  protected readonly languages: { code: AppLanguage; label: string }[] = [
    { code: 'ka', label: 'ქარ' },
    { code: 'en', label: 'ENG' },
    { code: 'ru', label: 'РУС' }
  ];

  protected readonly features: LandingFeature[] = [
    { icon: 'qr_code_2', titleKey: 'landing_feat1_title', descKey: 'landing_feat1_desc' },
    { icon: 'edit_note', titleKey: 'landing_feat2_title', descKey: 'landing_feat2_desc' },
    { icon: 'language', titleKey: 'landing_feat3_title', descKey: 'landing_feat3_desc' },
    { icon: 'location_on', titleKey: 'landing_feat4_title', descKey: 'landing_feat4_desc' }
  ];

  protected readonly steps: LandingStep[] = [
    { titleKey: 'landing_how1_title', descKey: 'landing_how1_desc' },
    { titleKey: 'landing_how2_title', descKey: 'landing_how2_desc' },
    { titleKey: 'landing_how3_title', descKey: 'landing_how3_desc' }
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

  constructor() {
    // scroll-reveal — მხოლოდ ბრაუზერში, ჩატვირთვის შემდეგ
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return;
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              io.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.15 }
      );
      this.elRef.nativeElement.querySelectorAll('.reveal').forEach((el: Element) => io.observe(el));

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

  setLang(lang: AppLanguage): void {
    this.language.setLang(lang);
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
