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

  protected readonly hotel = signal<Hotel | null>(null);
  protected readonly loadingHotel = signal(true);

  constructor() {
    const hotelId = this.auth.profile()?.hotel_id;
    if (this.auth.profile()?.role === 'hotel_admin' && hotelId) {
      this.adminHotel
        .getHotel(hotelId)
        .then((hotel) => this.hotel.set(hotel))
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
