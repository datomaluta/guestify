import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

interface PartnerLogo {
  src: string;
  alt: string;
}

const PARTNER_LOGOS: PartnerLogo[] = [
  { src: 'images/partners/castello-mare.webp', alt: 'Castello Mare' },
  { src: 'images/partners/dreamland-oasis.webp', alt: 'Dreamland Oasis' },
  { src: 'images/partners/georgiagold.webp', alt: 'Georgia Gold' },
  { src: 'images/partners/kasslogo.webp', alt: 'KASS' },
  { src: 'images/partners/orbi-hotels.webp', alt: 'Orbi Hotels' },
  { src: 'images/partners/sevsamora.webp', alt: 'Sevsamora' }
];

/**
 * marquee-ს "უსასრულო" scroll-ეფექტი translateX(0 -> -1/REPEAT_COUNT * 100%) ტრიკზეა აგებული —
 * ამისთვის ლოგოების ერთი კომპლექტის საერთო სიგანე ყოველთვის უნდა აღემატებოდეს ეკრანის სიგანეს,
 * თორემ loop-ის ბოლოში ცარიელი ადგილი გამოჩნდება (6 ლოგო ამის საკმარისად ვერ ივსებდა ფართო
 * ეკრანებზე). 4 ასლი კომპლექტს გარანტირებულად აჭარბებს ნებისმიერ რეალურ ეკრანის სიგანეს.
 */
const REPEAT_COUNT = 4;

@Component({
  selector: 'app-partners-section',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './partners-section.component.html',
  styleUrl: './partners-section.component.scss'
})
export class PartnersSectionComponent {
  protected readonly repeatGroups = Array.from({ length: REPEAT_COUNT }, (_, i) => i);
  protected readonly partnerLogos = PARTNER_LOGOS;
}
