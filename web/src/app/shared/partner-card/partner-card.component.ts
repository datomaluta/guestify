import { Component, computed, input } from '@angular/core';
import { Partner } from '../../core/models';
import { IconComponent } from '../icon/icon.component';

type Star = 'full' | 'half' | 'empty';

/**
 * პარტნიორი სასტუმროს ქარდი (ფოტო + სახელი + Google-ის შეფასება) — ლენდინგის Partners
 * სექციასა და /partners სრული სიის გვერდზე გაზიარებულია, რომ ვიზუალი ერთ ადგილას იმართებოდეს.
 */
@Component({
  selector: 'app-partner-card',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './partner-card.component.html',
  styleUrl: './partner-card.component.scss'
})
export class PartnerCardComponent {
  readonly partner = input.required<Partner>();

  /** null, თუ შეფასება არ აქვს — მაშინ რეიტინგის რიგი საერთოდ არ ჩანს (Home-ის ბანერისგან
   * განსხვავებით დეკორატიულ 5 ვარსკვლავს არ ვაჩვენებთ, რადგან ეს კონკრეტული სასტუმროს შეფასებად წაიკითხება). */
  protected readonly rating = computed(() => {
    const { google_rating, google_review_count } = this.partner();
    if (google_rating == null) return null;

    // ნახევარ ვარსკვლავამდე მრგვალდება (4.6 → ★★★★½) — home.component.ts-ის იგივე წესი
    const rounded = Math.round(Number(google_rating) * 2) / 2;
    const stars: Star[] = [1, 2, 3, 4, 5].map((i) => (rounded >= i ? 'full' : rounded >= i - 0.5 ? 'half' : 'empty'));

    return {
      score: Number(google_rating).toFixed(1),
      count: google_review_count ? google_review_count.toLocaleString('en-US') : null,
      stars
    };
  });
}
