import { Component, inject, signal } from '@angular/core';
import { GuidePlace } from '../../../core/models';
import { HotelService } from '../../../core/services/hotel.service';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { SubHeaderComponent } from '../../../shared/sub-header/sub-header.component';
import { IconComponent } from '../../../shared/icon/icon.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../../core/i18n/localize.pipe';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [SubHeaderComponent, IconComponent, TranslatePipe, LocalizePipe],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss'
})
export class GuideComponent {
  private readonly hotelService = inject(HotelService);
  private readonly hotelContext = inject(HotelContextService);

  protected readonly places = signal<GuidePlace[]>([]);
  protected readonly loading = signal(true);

  constructor() {
    const hotelId = this.hotelContext.hotel()?.id;
    if (hotelId) {
      this.hotelService
        .getGuidePlaces(hotelId)
        .then((items) => this.places.set(items))
        .finally(() => this.loading.set(false));
    } else {
      this.loading.set(false);
    }
  }
}
