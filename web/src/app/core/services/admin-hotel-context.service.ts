import { Injectable, signal } from '@angular/core';
import { Hotel } from '../models';

/** `/admin/content/:hotelId`-ის დედა route-ი ერთხელ ტვირთავს (იხ. admin-hotel.resolver.ts),
 * შვილი editor-ები (services/menu/guide/rules/essentials/ai-topics) აქედან კითხულობენ hotel-ს —
 * იმეორებს guest-მხარის HotelContextService-ის პატერნს. */
@Injectable({ providedIn: 'root' })
export class AdminHotelContextService {
  readonly hotel = signal<Hotel | null>(null);
}
