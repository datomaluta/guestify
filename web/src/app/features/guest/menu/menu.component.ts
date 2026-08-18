import { Component, computed, inject, signal } from '@angular/core';
import { MenuCategory, MenuItem } from '../../../core/models';
import { HotelService } from '../../../core/services/hotel.service';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { SubHeaderComponent } from '../../../shared/sub-header/sub-header.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../../core/i18n/localize.pipe';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SubHeaderComponent, TranslatePipe, LocalizePipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  private readonly hotelService = inject(HotelService);
  private readonly hotelContext = inject(HotelContextService);

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

  selectCategory(id: string): void {
    this.activeCategoryId.set(id);
  }

  currencySymbol(code: string): string {
    return { GEL: '₾', USD: '$', EUR: '€' }[code] ?? code;
  }
}
