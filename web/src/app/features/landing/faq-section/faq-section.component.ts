import { Component, ElementRef, QueryList, ViewChildren, afterNextRender, signal } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';

interface FaqItem {
  qKey: string;
  aKey: string;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [TranslatePipe, IconComponent],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss'
})
export class FaqSectionComponent {
  protected readonly items: FaqItem[] = [
    { qKey: 'landing_faq1_q', aKey: 'landing_faq1_a' },
    { qKey: 'landing_faq2_q', aKey: 'landing_faq2_a' },
    { qKey: 'landing_faq3_q', aKey: 'landing_faq3_a' },
    { qKey: 'landing_faq4_q', aKey: 'landing_faq4_a' },
    { qKey: 'landing_faq5_q', aKey: 'landing_faq5_a' },
    { qKey: 'landing_faq6_q', aKey: 'landing_faq6_a' },
    { qKey: 'landing_faq7_q', aKey: 'landing_faq7_a' },
    { qKey: 'landing_faq8_q', aKey: 'landing_faq8_a' }
  ];

  protected readonly openIndex = signal(0);

  /**
   * ღია პასუხის რეალური სიმაღლე (px) — max-height ზუსტად კონტენტზე რომ იყოს მორგებული
   * (grid-template-rows: 0fr/1fr ტრიკი აქ არ მუშაობს ზუსტად, რადგან auto-height კონტეინერში
   * ერთადერთი flexible row კონტენტის სიმაღლეზეა დაყრდნობილი ნებისმიერი fr მნიშვნელობისთვის,
   * გარდა ზუსტად 0fr-ისა). განზრახ არის plain signal და არა template-იდან გამოძახებული
   * DOM-წამკითხველი მეთოდი — ის NG0100-ს (ExpressionChangedAfterItHasBeenCheckedError) იწვევდა,
   * რადგან @ViewChildren პირველივე change-detection cycle-ზე ჯერ არ იყო შევსებული და
   * dev-mode-ის ხელახალ შემოწმებაზე მნიშვნელობა იცვლებოდა იმავე tick-ში. ამის მაგივრად
   * სიმაღლე იზომება მხოლოდ toggle()-ში (click-ივენთი, არა template binding) და afterNextRender-ში
   * (საწყისად ღია ელემენტისთვის) — ორივე calc-ის მიღმაა, ცალკე CD ციკლს იწყებს უსაფრთხოდ.
   */
  protected readonly openHeight = signal(0);

  @ViewChildren('answerText') private answerEls!: QueryList<ElementRef<HTMLElement>>;

  constructor() {
    afterNextRender(() => this.measureOpenHeight());
  }

  toggle(i: number): void {
    const next = this.openIndex() === i ? -1 : i;
    this.openIndex.set(next);
    if (next !== -1) {
      this.measureOpenHeight();
    }
  }

  private measureOpenHeight(): void {
    const el = this.answerEls?.get(this.openIndex())?.nativeElement;
    this.openHeight.set(el ? el.scrollHeight : 0);
  }
}
