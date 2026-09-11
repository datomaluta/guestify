import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/icon/icon.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../../core/i18n/localize.pipe';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { HotelService } from '../../../core/services/hotel.service';
import { GuidePlace, guideCategoryMeta } from '../../../core/models';

interface NavCard {
  route: string;
  icon: string;
  titleKey: string;
  descKey: string;
}

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
const HOME_FAVORITES_LIMIT = 3;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, IconComponent, TranslatePipe, LocalizePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly hotelContext = inject(HotelContextService);
  private readonly hotelService = inject(HotelService);

  protected readonly guideCategoryMeta = guideCategoryMeta;
  protected readonly favoritePlaces = signal<GuidePlace[]>([]);
  protected readonly hasMoreFavorites = signal(false);

  constructor() {
    const hotelId = this.hotelContext.hotel()?.id;
    if (hotelId) {
      this.hotelService.getGuidePlaces(hotelId).then((places) => {
        this.favoritePlaces.set(places.slice(0, HOME_FAVORITES_LIMIT));
        this.hasMoreFavorites.set(places.length > HOME_FAVORITES_LIMIT);
      });
    }
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

  protected readonly cards: NavCard[] = [
    {
      route: 'services',
      icon: 'room_service',
      titleKey: 'nav_services',
      descKey: 'nav_services_desc',
    },
    {
      route: 'menu',
      icon: 'restaurant',
      titleKey: 'nav_menu',
      descKey: 'nav_menu_desc',
    },
    {
      route: 'guide',
      icon: 'location_on',
      titleKey: 'nav_guide',
      descKey: 'nav_guide_desc',
    },
    {
      route: 'rules',
      icon: 'rule',
      titleKey: 'nav_rules',
      descKey: 'nav_rules_desc',
    },
  ];
}
