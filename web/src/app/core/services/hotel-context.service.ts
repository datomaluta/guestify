import { Injectable, inject, signal } from '@angular/core';
import { HotelService } from './hotel.service';
import { LanguageService } from '../i18n/language.service';
import { Hotel } from '../models';

const DEFAULT_PRIMARY = '#96772F';
const DEFAULT_SECONDARY = '#7A2638';

/**
 * მთელი white-label მექანიზმის გული: slug-ით ტვირთავს სასტუმროს row-ს
 * და აყენებს --brand-primary / --brand-secondary CSS ცვლადებს document root-ზე,
 * რომ ერთმა კოდმა ავტომატურად "აიღოს" თითოეული სასტუმროს ბრენდი.
 */
@Injectable({ providedIn: 'root' })
export class HotelContextService {
  private readonly hotelService = inject(HotelService);
  private readonly language = inject(LanguageService);

  readonly hotel = signal<Hotel | null>(null);
  readonly notFound = signal(false);

  async loadBySlug(slug: string): Promise<Hotel | null> {
    this.notFound.set(false);
    const hotel = await this.hotelService.getBySlug(slug);

    if (!hotel) {
      this.notFound.set(true);
      this.hotel.set(null);
      return null;
    }

    this.hotel.set(hotel);
    this.applyBrand(hotel);
    this.language.applyHotelDefault(hotel.default_language);
    return hotel;
  }

  private applyBrand(hotel: Hotel): void {
    const root = document.documentElement.style;
    root.setProperty('--brand-primary', hotel.primary_color || DEFAULT_PRIMARY);
    root.setProperty('--brand-secondary', hotel.secondary_color || DEFAULT_SECONDARY);
  }
}
