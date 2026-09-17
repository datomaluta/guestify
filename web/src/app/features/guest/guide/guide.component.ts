import { Component, ElementRef, computed, inject, signal } from '@angular/core';
import { GuidePlace, GUIDE_CATEGORIES, guideCategoryMeta } from '../../../core/models';
import { HotelService } from '../../../core/services/hotel.service';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { IconComponent } from '../../../shared/icon/icon.component';
import { PlaceCardComponent } from '../../../shared/place-card/place-card.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

interface GuideGroup {
  key: string;
  labelKey: string;
  icon: string;
  places: GuidePlace[];
}

const OTHER_KEY = '__other__';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [IconComponent, PlaceCardComponent, TranslatePipe],
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.scss',
})
export class GuideComponent {
  private readonly hotelService = inject(HotelService);
  private readonly hotelContext = inject(HotelContextService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  protected readonly places = signal<GuidePlace[]>([]);
  protected readonly loading = signal(true);
  protected readonly skeletonRows = [0, 1, 2];
  // null = ფილტრი არაა მონიშნული, ყველა კატეგორია ჩანს.
  protected readonly selectedCategory = signal<string | null>(null);

  // GUIDE_CATEGORIES-ის რიგით ჯგუფდება; category, რომელიც ცნობილ სიაში არ ჯდება
  // (ან ცარიელია), "სხვა"-ს ჯგუფში ხვდება ბოლოში. ცარიელი ჯგუფი საერთოდ არ გამოჩნდება.
  protected readonly groups = computed<GuideGroup[]>(() => {
    const all = this.places();
    const knownKeys = Object.keys(GUIDE_CATEGORIES);
    const groups: GuideGroup[] = [];

    for (const key of knownKeys) {
      const items = all.filter((place) => place.category === key);
      if (items.length) {
        groups.push({
          key,
          labelKey: GUIDE_CATEGORIES[key].labelKey,
          icon: GUIDE_CATEGORIES[key].icon,
          places: items,
        });
      }
    }

    const other = all.filter(
      (place) => !place.category || !knownKeys.includes(place.category),
    );
    if (other.length) {
      const meta = guideCategoryMeta(null);
      groups.push({ key: OTHER_KEY, labelKey: meta.labelKey, icon: meta.icon, places: other });
    }

    return groups;
  });

  // ფილტრის ჩიფსების დაწკაპუნებაზე ჩანს მხოლოდ ერჩეული კატეგორია — თუ ისევ იმავეს
  // დააჭერს, მონიშვნა იხსნება და ისევ ყველა კატეგორია ჩნდება.
  protected readonly visibleGroups = computed<GuideGroup[]>(() => {
    const selected = this.selectedCategory();
    const all = this.groups();
    return selected ? all.filter((group) => group.key === selected) : all;
  });

  /**
   * ფილტრის გადართვისას სქროლი თავში ვწევთ — .app-body (guest-shell) სქროლავს გვერდს,
   * არა document-ი, ამიტომ route-ის ცვლილების მსგავსი ეფექტი აქ თავად უნდა გამოვიწვიოთ,
   * თორემ გრძელი სიიდან ფილტრის გადართვისას მომხმარებელი ახალი სიის შუაში/ბოლოში დარჩება.
   */
  protected toggleCategory(key: string): void {
    this.selectedCategory.update((current) => (current === key ? null : key));
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start' });
  }

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
