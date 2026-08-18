import { Component, inject, signal } from '@angular/core';
import { HotelService as HotelServiceItem } from '../../../core/models';
import { HotelService } from '../../../core/services/hotel.service';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { SubHeaderComponent } from '../../../shared/sub-header/sub-header.component';
import { IconComponent, IconName, ICON_NAMES } from '../../../shared/icon/icon.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../../core/i18n/localize.pipe';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [SubHeaderComponent, IconComponent, TranslatePipe, LocalizePipe],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  private readonly hotelService = inject(HotelService);
  private readonly hotelContext = inject(HotelContextService);

  protected readonly services = signal<HotelServiceItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly skeletonRows = [0, 1, 2, 3, 4];

  constructor() {
    const hotelId = this.hotelContext.hotel()?.id;
    if (hotelId) {
      this.hotelService
        .getServices(hotelId)
        .then((items) => this.services.set(items))
        .finally(() => this.loading.set(false));
    } else {
      this.loading.set(false);
    }
  }

  iconFor(icon: string | null): IconName {
    return ICON_NAMES.includes(icon as IconName) ? (icon as IconName) : 'general';
  }
}
