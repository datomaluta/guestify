import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { AdminHotelContextService } from './admin-hotel-context.service';
import { AdminHotelService } from './admin-hotel.service';
import { Hotel } from '../models';

/** content/:hotelId route-ის დედა resolver — ერთხელ ტვირთავს, შვილი editor-ები
 * AdminHotelContextService-იდან იყენებენ. hotelAdminGuard-ი წვდომას ცალკე ამოწმებს. */
export const adminHotelResolver: ResolveFn<Hotel | null> = async (route) => {
  const hotelId = route.paramMap.get('hotelId')!;
  const context = inject(AdminHotelContextService);
  const hotel = await inject(AdminHotelService).getHotel(hotelId);
  context.hotel.set(hotel);
  return hotel;
};
