import { Component, ElementRef, computed, inject, signal } from '@angular/core';
import { MenuCategory, MenuItem } from '../../../core/models';
import { HotelService } from '../../../core/services/hotel.service';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../../core/i18n/localize.pipe';
import { ImgFadeInDirective } from '../../../shared/directives/img-fade-in.directive';
import { MenuItemSheetComponent } from './menu-item-sheet/menu-item-sheet.component';

interface MenuGroup {
  category: MenuCategory;
  items: MenuItem[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [TranslatePipe, LocalizePipe, MenuItemSheetComponent, ImgFadeInDirective],
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
  // null = ფილტრი არაა მონიშნული, ყველა კატეგორია ჩანს.
  protected readonly activeCategoryId = signal<string | null>(null);
  protected readonly selectedItem = signal<MenuItem | null>(null);
  protected readonly skeletonTabs = [0, 1, 2];
  protected readonly skeletonRows = [0, 1, 2, 3, 4];

  // categories()-ის რიგით (sort_order) ჯგუფდება; ცარიელი კატეგორია საერთოდ არ გამოჩნდება.
  protected readonly groups = computed<MenuGroup[]>(() => {
    const allItems = this.items();
    const groups: MenuGroup[] = [];

    for (const category of this.categories()) {
      const categoryItems = allItems.filter((item) => item.category_id === category.id);
      if (categoryItems.length) {
        groups.push({ category, items: categoryItems });
      }
    }

    return groups;
  });

  // ფილტრის ჩიფსების დაწკაპუნებაზე ჩანს მხოლოდ არჩეული კატეგორია — თუ ისევ იმავეს
  // დააჭერს, მონიშვნა იხსნება და ისევ ყველა კატეგორია ჩნდება.
  protected readonly visibleGroups = computed<MenuGroup[]>(() => {
    const selected = this.activeCategoryId();
    const all = this.groups();
    return selected ? all.filter((group) => group.category.id === selected) : all;
  });

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
      })
      .finally(() => this.loading.set(false));
  }

  /**
   * ფილტრის გადართვისას სქროლი თავში ვწევთ — .app-body (guest-shell) სქროლავს
   * გვერდს, არა document-ი, ამიტომ route-ის ცვლილების (და ბრაუზერის ავტომატური
   * scroll-restoration-ის) მსგავსი ეფექტი აქ თავად უნდა გამოვიწვიოთ, თორემ გრძელი
   * სიიდან ფილტრის გადართვისას მომხმარებელი ახალი სიის შუაში/ბოლოში დარჩება ხოლმე.
   */
  selectCategory(id: string): void {
    this.activeCategoryId.update((current) => (current === id ? null : id));
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start' });
  }

  currencySymbol(code: string): string {
    return { GEL: '₾', USD: '$', EUR: '€' }[code] ?? code;
  }

  openItem(item: MenuItem): void {
    this.selectedItem.set(item);
  }

  closeItem(): void {
    this.selectedItem.set(null);
  }
}
