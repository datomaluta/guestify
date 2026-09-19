import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AdminHotelService } from '../../../core/services/admin-hotel.service';
import { QrCodeComponent } from '../../../shared/qr-code/qr-code.component';
import { Hotel } from '../../../core/models';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterLink, QrCodeComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {
  protected readonly auth = inject(AuthService);
  private readonly adminHotel = inject(AdminHotelService);

  protected readonly hotels = signal<Hotel[]>([]);
  protected readonly loadingHotel = signal(true);

  constructor() {
    const profile = this.auth.profile();
    if (profile?.role === 'hotel_admin') {
      this.adminHotel
        .listMyHotels(profile.id)
        .then((hotels) => this.hotels.set(hotels))
        .finally(() => this.loadingHotel.set(false));
    } else {
      this.loadingHotel.set(false);
    }
  }

  /** სტუმრის public URL, რომელზეც QR კოდი მიდის — მიმდინარე host-ზეა აგებული, სად უნდა deploy-ილიყოს, არ აქვს მნიშვნელობა. */
  hotelUrl(slug: string): string {
    return `${window.location.origin}/hotel/${slug}`;
  }
}
