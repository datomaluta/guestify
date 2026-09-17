import { Component, ElementRef, computed, inject, signal } from '@angular/core';
import { MenuCategory, MenuItem } from '../../../core/models';
import { HotelService } from '../../../core/services/hotel.service';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../../core/i18n/localize.pipe';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TranslatePipe, LocalizePipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private readonly hotelService = inject(HotelService);
  private readonly hotelContext = inject(HotelContextService);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  protected readonly categories = signal<MenuCategory[]>([]);
  protected readonly items = signal<MenuItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly activeCategoryId = signal<string | null>(null);
  protected readonly skeletonTabs = [0, 1, 2];
  protected readonly skeletonRows = [0, 1, 2, 3, 4];

  protected readonly visibleItems = computed(() =>
    this.items().filter((item) => item.category_id === this.activeCategoryId())
  );

  constructor() {
    const hotelId = this.hotelContext.hotel()?.id;
    if (!hotelId) {
      this.loading.set(false);
      return;
    }

    Promise.all([this.hotelService.getMenuCategories(hotelId), this.hotelService.getMenuItems(hotelId)])
      .then(([categories, items]) => {
        this.categories.set(categories);
        this.items.set(items);
        this.activeCategoryId.set(categories[0]?.id ?? null);
      })
      .finally(() => this.loading.set(false));
  }

  /**
   * კატეგორიის გადართვისას სქროლი თავში ვწევთ — .app-body (guest-shell) სქროლავს
   * გვერდს, არა document-ი, ამიტომ route-ის ცვლილების (და ბრაუზერის ავტომატური
   * scroll-restoration-ის) მსგავსი ეფექტი აქ თავად უნდა გამოვიწვიოთ, თორემ გრძელი
   * კატეგორიიდან გადართვისას მომხმარებელი ახალი სიის შუაში/ბოლოში დარჩება ხოლმე.
   */
  selectCategory(id: string): void {
    this.activeCategoryId.set(id);
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start' });
  }

  currencySymbol(code: string): string {
    return { GEL: '₾', USD: '$', EUR: '€' }[code] ?? code;
  }
}
