import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/icon/icon.component';
import { PlaceCardComponent } from '../../../shared/place-card/place-card.component';
import { AmenityCardComponent } from '../../../shared/amenity-card/amenity-card.component';
import { AmenityDetailSheetComponent } from '../../../shared/amenity-detail-sheet/amenity-detail-sheet.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../../core/i18n/localize.pipe';
import { ImgFadeInDirective } from '../../../shared/directives/img-fade-in.directive';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { HotelService } from '../../../core/services/hotel.service';
import { GuidePlace, FeaturedAmenity } from '../../../core/models';

interface IntentCard {
  route: string;
  icon: string;
  labelKey: string;
}

interface QuickAccessItem {
  route: string;
  icon: string;
  labelKey: string;
}

// Home-ზე მაქსიმუმ ამდენი "Local Favorites" ბარათი ჩანს — თუ სასტუმროს მეტი აქვს
// დამატებული, ბოლოში "ყველას ნახვა" ჩნდება და Explore (guide) გვერდზე გადაყავს.
const HOME_FAVORITES_LIMIT = 5;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    IconComponent,
    PlaceCardComponent,
    AmenityCardComponent,
    AmenityDetailSheetComponent,
    TranslatePipe,
    LocalizePipe,
    ImgFadeInDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly hotelContext = inject(HotelContextService);
  private readonly hotelService = inject(HotelService);

  protected readonly favoritePlaces = signal<GuidePlace[]>([]);
  protected readonly hasMoreFavorites = signal(false);

  protected readonly featuredAmenities = signal<FeaturedAmenity[]>([]);
  protected readonly featuredAmenitiesLoading = signal(true);
  protected readonly amenitySkeletons = [0, 1, 2];
  protected readonly selectedAmenity = signal<FeaturedAmenity | null>(null);

  constructor() {
    const hotelId = this.hotelContext.hotel()?.id;
    if (hotelId) {
      this.hotelService.getGuidePlaces(hotelId).then((places) => {
        this.favoritePlaces.set(places.slice(0, HOME_FAVORITES_LIMIT));
        this.hasMoreFavorites.set(places.length > HOME_FAVORITES_LIMIT);
      });
      this.hotelService
        .getFeaturedAmenities(hotelId)
        .then((amenities) => this.featuredAmenities.set(amenities))
        .finally(() => this.featuredAmenitiesLoading.set(false));
    } else {
      this.featuredAmenitiesLoading.set(false);
    }
  }

  openAmenity(amenity: FeaturedAmenity): void {
    this.selectedAmenity.set(amenity);
  }

  closeAmenity(): void {
    this.selectedAmenity.set(null);
  }

  // "რაღაც მჭირდება" სტანდარტ სასტუმროზე AI-ს ნაცვლად essentials-ზე მიდის — AI ხომ პრემიუმ-ონლი ტაბია.
  protected readonly intentCards = computed<IntentCard[]>(() => [
    { route: 'essentials', icon: 'key', labelKey: 'home_intent_arrived' },
    {
      route: this.hotelContext.isPremium() ? 'ai' : 'essentials',
      icon: 'question_mark',
      labelKey: 'home_intent_need',
    },
    { route: 'guide', icon: 'explore', labelKey: 'home_intent_explore' },
  ]);

  protected readonly quickAccessItems: QuickAccessItem[] = [
    { route: 'essentials', icon: 'wifi', labelKey: 'home_qa_wifi' },
    { route: 'essentials', icon: 'logout', labelKey: 'home_qa_checkout' },
    { route: 'essentials', icon: 'local_parking', labelKey: 'home_qa_parking' }
  ];
}
