import { Component, ElementRef, QueryList, ViewChildren, signal } from '@angular/core';
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

  /** თითო FAQ პასუხის ტექსტ-ელემენტი — რეალური სიმაღლის გასაზომად, რომ max-height ზუსტად
   * კონტენტზე მორგებული იყოს და არა თვითნებური რიცხვი (grid-template-rows: 0fr/1fr ტრიკი
   * აქ არ მუშაობს ზუსტად, რადგან auto-height კონტეინერში ერთადერთი flexible row კონტენტის
   * სიმაღლეზეა დაყრდნობილი ნებისმიერი fr მნიშვნელობისთვის, გარდა ზუსტად 0fr-ისა). */
  @ViewChildren('answerText') private answerEls!: QueryList<ElementRef<HTMLElement>>;

  toggle(i: number): void {
    this.openIndex.update((current) => (current === i ? -1 : i));
  }

  maxHeight(i: number): string {
    if (this.openIndex() !== i) {
      return '0px';
    }
    const el = this.answerEls?.get(i)?.nativeElement;
    return el ? `${el.scrollHeight}px` : 'none';
  }
}
