import { Component, computed, inject, signal } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../../core/i18n/localize.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';
import { DEFAULT_ICON } from '../../../shared/icon/icon-options';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { HotelService } from '../../../core/services/hotel.service';
import { HotelRule, HotelService as HotelServiceItem, FeaturedAmenity } from '../../../core/models';
import { AmenityCardComponent } from '../../../shared/amenity-card/amenity-card.component';
import { AmenityDetailSheetComponent } from '../../../shared/amenity-detail-sheet/amenity-detail-sheet.component';

interface StayInfoItem {
  key: string;
  icon: string;
  titleKey: string;
  /** localize()-ის 'field' არგუმენტი (მაგ. 'checkin_time') — თარგმანი პირდაპირ template-ში, LocalizePipe-ით */
  metaField: string;
  descriptionField: string;
}

/** hotel-ის ობიექტზე მოცემულ prefix-ს რომელიმე ენაზე (ka/en/ru) აქვს თუ არა შევსებული მნიშვნელობა. */
function hasLocalizedValue(hotel: Record<string, any>, field: string): boolean {
  return !!(hotel[`${field}_ka`] || hotel[`${field}_en`] || hotel[`${field}_ru`]);
}

type CopiedField = 'network' | 'password' | null;

/** Bottom nav-ის "Essentials" ტაბი — Wi-Fi, Check-in/out, საკონტაქტო, წესები, სერვისები, პარკინგი, საგანგებო ზარები. */
@Component({
  selector: 'app-essentials',
  standalone: true,
  imports: [TranslatePipe, LocalizePipe, IconComponent, AmenityCardComponent, AmenityDetailSheetComponent],
  templateUrl: './essentials.component.html',
  styleUrl: './essentials.component.scss'
})
export class EssentialsComponent {
  protected readonly hotelContext = inject(HotelContextService);
  private readonly hotelService = inject(HotelService);

  protected readonly rules = signal<HotelRule[]>([]);
  protected readonly rulesLoading = signal(true);
  protected readonly ruleSkeletons = [0, 1, 2, 3];

  protected readonly services = signal<HotelServiceItem[]>([]);
  protected readonly servicesLoading = signal(true);
  protected readonly serviceSkeletons = [0, 1, 2, 3];

  protected readonly featuredAmenities = signal<FeaturedAmenity[]>([]);
  protected readonly featuredAmenitiesLoading = signal(true);
  protected readonly amenitySkeletons = [0, 1, 2];
  protected readonly selectedAmenity = signal<FeaturedAmenity | null>(null);

  constructor() {
    const hotelId = this.hotelContext.hotel()?.id;
    if (hotelId) {
      Promise.all([
        this.hotelService.getRules(hotelId),
        this.hotelService.getServices(hotelId),
        this.hotelService.getFeaturedAmenities(hotelId)
      ])
        .then(([rules, services, featuredAmenities]) => {
          this.rules.set(rules);
          this.services.set(services);
          this.featuredAmenities.set(featuredAmenities);
        })
        .finally(() => {
          this.rulesLoading.set(false);
          this.servicesLoading.set(false);
          this.featuredAmenitiesLoading.set(false);
        });
    } else {
      this.rulesLoading.set(false);
      this.servicesLoading.set(false);
      this.featuredAmenitiesLoading.set(false);
    }
  }

  iconOrDefault(icon: string | null): string {
    return icon || DEFAULT_ICON;
  }

  openAmenity(amenity: FeaturedAmenity): void {
    this.selectedAmenity.set(amenity);
  }

  closeAmenity(): void {
    this.selectedAmenity.set(null);
  }

  protected readonly wifiNetwork = computed(() => this.hotelContext.hotel()?.wifi_network ?? null);
  protected readonly wifiPassword = computed(() => this.hotelContext.hotel()?.wifi_password ?? null);
  protected readonly hasWifi = computed(() => !!(this.wifiNetwork() || this.wifiPassword()));

  protected readonly stayItems = computed<StayInfoItem[]>(() => {
    const hotel = this.hotelContext.hotel();
    if (!hotel) return [];
    const items: StayInfoItem[] = [];
    if (hasLocalizedValue(hotel, 'checkin_time') || hasLocalizedValue(hotel, 'checkin_note')) {
      items.push({
        key: 'checkin',
        icon: 'key',
        titleKey: 'essentials_checkin_title',
        metaField: 'checkin_time',
        descriptionField: 'checkin_note'
      });
    }
    if (hasLocalizedValue(hotel, 'checkout_time') || hasLocalizedValue(hotel, 'checkout_note')) {
      items.push({
        key: 'checkout',
        icon: 'logout',
        titleKey: 'essentials_checkout_title',
        metaField: 'checkout_time',
        descriptionField: 'checkout_note'
      });
    }
    return items;
  });

  protected readonly hasStayCard = computed(() => this.hasWifi() || this.stayItems().length > 0);

  protected readonly copiedField = signal<CopiedField>(null);
  private copyResetTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly expandedKeys = signal<ReadonlySet<string>>(new Set());

  isExpanded(key: string): boolean {
    return this.expandedKeys().has(key);
  }

  toggle(key: string): void {
    const next = new Set(this.expandedKeys());
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    this.expandedKeys.set(next);
  }

  // wa.me-ს მხოლოდ ციფრები სჭირდება — hotels.whatsapp ველში ფორმატირებული ნომერიც (+393...) დასაშვებია
  protected readonly whatsappLink = computed(() => {
    const raw = this.hotelContext.hotel()?.whatsapp;
    if (!raw) return null;
    const digits = raw.replace(/\D/g, '');
    return digits ? `https://wa.me/${digits}` : null;
  });

  protected readonly pharmacyMapsUrl = computed(() => this.hotelContext.hotel()?.pharmacy_maps_url ?? null);
  protected readonly atmMapsUrl = computed(() => this.hotelContext.hotel()?.atm_maps_url ?? null);

  copy(field: 'network' | 'password', value: string): void {
    navigator.clipboard
      ?.writeText(value)
      .then(() => {
        this.copiedField.set(field);
        if (this.copyResetTimer) clearTimeout(this.copyResetTimer);
        this.copyResetTimer = setTimeout(() => this.copiedField.set(null), 1800);
      })
      .catch(() => {});
  }
}
