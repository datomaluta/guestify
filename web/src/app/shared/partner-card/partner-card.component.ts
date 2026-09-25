import { Component, input } from '@angular/core';

export interface PartnerHotel {
  slug: string;
  name: string;
  logo: string;
  featured?: boolean;
}

/**
 * პარტნიორი სასტუმროს ქარდი (ლოგო + სახელი) — ლენდინგის Partners სექციასა
 * და /partners სრული სიის გვერდზე გაზიარებულია, რომ ვიზუალი ერთ ადგილას იმართებოდეს.
 */
@Component({
  selector: 'app-partner-card',
  standalone: true,
  templateUrl: './partner-card.component.html',
  styleUrl: './partner-card.component.scss'
})
export class PartnerCardComponent {
  readonly partner = input.required<PartnerHotel>();
}
