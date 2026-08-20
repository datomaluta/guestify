import { Injectable, inject, signal } from '@angular/core';
import { HotelService } from './hotel.service';
import { LanguageService } from '../i18n/language.service';
import { Hotel } from '../models';

/**
 * slug-ით ტვირთავს სასტუმროს row-ს. ბრენდის ფერები (hotel.primary_color/secondary_color)
 * განზრახ არ გამოიყენება UI-ში — დროებით გადავწყვიტეთ, რომ ყველა სასტუმროს ერთი
 * სტატიკური ბრენდ-ფერი ჰქონდეს (styles.scss-ის --brand-primary/--brand-secondary),
 * რომ თითო სასტუმროს თვითნებურმა ფერმა დიზაინი არ დაარღვიოს. ეს ველები admin-ში
 * (hotel-form) განზრახ დარჩა — მომავალში აქტივაცია მარტივი იქნება, უბრალოდ ეს
 * კომენტარი და ქვემოთ applyBrand-ის გამოძახება უნდა დაბრუნდეს.
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
    this.language.applyHotelDefault(hotel.default_language);
    return hotel;
  }
}
