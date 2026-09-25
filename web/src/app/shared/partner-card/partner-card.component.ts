import { Component, input } from '@angular/core';
import { RevealDirective } from '../directives/reveal.directive';

export interface PartnerHotel {
  slug: string;
  name: string;
  logo: string;
  featured?: boolean;
}

/**
 * პარტნიორი სასტუმროს ქარდი (ლოგო + სახელი) — ლენდინგის Partners სექციასა
 * და /partners სრული სიის გვერდზე გაზიარებულია, რომ ვიზუალი ერთ ადგილას იმართებოდეს.
 * scroll-reveal ანიმაცია თავად ქარდშივეა (და არა მშობელ template-ებში) — host-ს
 * `display: contents` აქვს, ამიტომ appReveal-ს რეალურად ხატვადი root ელემენტი
 * (.partner-card) სჭირდება, არა host თავად.
 */
@Component({
  selector: 'app-partner-card',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './partner-card.component.html',
  styleUrl: './partner-card.component.scss'
})
export class PartnerCardComponent {
  readonly partner = input.required<PartnerHotel>();
  readonly revealDelayMs = input(0);
}
