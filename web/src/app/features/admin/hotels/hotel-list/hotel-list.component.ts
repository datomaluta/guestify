import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hotel } from '../../../../core/models';
import { AdminHotelService } from '../../../../core/services/admin-hotel.service';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss'
})
export class HotelListComponent {
  private readonly adminHotel = inject(AdminHotelService);

  protected readonly hotels = signal<Hotel[]>([]);
  protected readonly loading = signal(true);

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.loading.set(true);
    this.adminHotel
      .listHotels()
      .then((hotels) => this.hotels.set(hotels))
      .finally(() => this.loading.set(false));
  }
}
