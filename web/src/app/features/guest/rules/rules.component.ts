import { Component, inject, signal } from '@angular/core';
import { HotelRule, HotelContact } from '../../../core/models';
import { HotelService } from '../../../core/services/hotel.service';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { SubHeaderComponent } from '../../../shared/sub-header/sub-header.component';
import { IconComponent, IconName, ICON_NAMES } from '../../../shared/icon/icon.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../../core/i18n/localize.pipe';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [SubHeaderComponent, IconComponent, TranslatePipe, LocalizePipe],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss'
})
export class RulesComponent {
  private readonly hotelService = inject(HotelService);
  private readonly hotelContext = inject(HotelContextService);

  protected readonly rules = signal<HotelRule[]>([]);
  protected readonly contacts = signal<HotelContact[]>([]);
  protected readonly loading = signal(true);
  protected readonly skeletonRows = [0, 1, 2, 3, 4];

  constructor() {
    const hotelId = this.hotelContext.hotel()?.id;
    if (hotelId) {
      Promise.all([this.hotelService.getRules(hotelId), this.hotelService.getContacts(hotelId)])
        .then(([rules, contacts]) => {
          this.rules.set(rules);
          this.contacts.set(contacts);
        })
        .finally(() => this.loading.set(false));
    } else {
      this.loading.set(false);
    }
  }

  iconFor(icon: string | null): IconName {
    return ICON_NAMES.includes(icon as IconName) ? (icon as IconName) : 'general';
  }
}
