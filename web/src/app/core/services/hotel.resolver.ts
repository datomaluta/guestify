import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HotelContextService } from './hotel-context.service';
import { Hotel } from '../models';

/** hotel/:slug route-ის დედა resolver — ერთხელ ტვირთავს, შვილი route-ები (home/services/menu…) იყენებენ HotelContextService-იდან. */
export const hotelResolver: ResolveFn<Hotel | null> = (route) => {
  const slug = route.paramMap.get('slug')!;
  const context = inject(HotelContextService);
  return context.loadBySlug(slug);
};
