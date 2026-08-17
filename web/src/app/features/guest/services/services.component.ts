import { Component, inject, signal } from '@angular/core';
import { HotelService as HotelServiceItem } from '../../../core/models';
import { HotelService } from '../../../core/services/hotel.service';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { SubHeaderComponent } from '../../../shared/sub-header/sub-header.component';
import { IconComponent, IconName } from '../../../shared/icon/icon.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../../core/i18n/localize.pipe';

const KNOWN_ICONS: IconName[] = ['concierge-bell', 'cutlery', 'map-pin', 'shield-check', 'cup', 'droplet', 'clock', 'wifi'];

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
    return KNOWN_ICONS.includes(icon as IconName) ? (icon as IconName) : 'concierge-bell';
  }
}
