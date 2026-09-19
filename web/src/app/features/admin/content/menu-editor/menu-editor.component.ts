import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag, CdkDragHandle, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ALLERGENS, MenuCategory, MenuItem } from '../../../../core/models';
import { AdminContentService } from '../../../../core/services/admin-content.service';
import { AdminHotelContextService } from '../../../../core/services/admin-hotel-context.service';
import { IconComponent } from '../../../../shared/icon/icon.component';

interface CategoryForm {
  name_ka: string;
  name_en: string;
  name_ru: string;
}

interface ItemForm {
  category_id: string;
  name_ka: string;
  name_en: string;
  name_ru: string;
  description_ka: string;
  description_en: string;
  description_ru: string;
  ingredients_ka: string;
  ingredients_en: string;
  ingredients_ru: string;
  allergens: string[];
  price: number;
  currency: string;
  is_available: boolean;
}

const BLANK_CATEGORY: CategoryForm = { name_ka: '', name_en: '', name_ru: '' };

const BLANK_ITEM: ItemForm = {
  category_id: '',
  name_ka: '',
  name_en: '',
  name_ru: '',
  description_ka: '',
  description_en: '',
  description_ru: '',
  ingredients_ka: '',
  ingredients_en: '',
  ingredients_ru: '',
  allergens: [],
  price: 0,
  currency: 'GEL',
  is_available: true
};

/** რიგითობა აღარ ჩაიწერება ხელით — ორივე სია (კატეგორიები, კერძები) drag-and-drop-ით
 * (@angular/cdk/drag-drop) გადალაგდება, drop()-ზე კი reindex-ული sort_order ერთბაშად ინახება. */
@Component({
  selector: 'app-menu-editor',
  standalone: true,
  imports: [FormsModule, IconComponent, CdkDropList, CdkDrag, CdkDragHandle],
  templateUrl: './menu-editor.component.html',
  styleUrl: './menu-editor.component.scss'
})
export class MenuEditorComponent {
  private readonly content = inject(AdminContentService);
  private readonly hotelId = inject(AdminHotelContextService).hotel()!.id;

  protected readonly categories = signal<MenuCategory[]>([]);
  protected readonly items = signal<MenuItem[]>([]);
  protected readonly loading = signal(true);

  protected categoryForm: CategoryForm = { ...BLANK_CATEGORY };
  protected readonly editingCategoryId = signal<string | null>(null);
  protected readonly savingCategory = signal(false);
  protected readonly categoryError = signal<string | null>(null);

  protected itemForm: ItemForm = { ...BLANK_ITEM };
  protected readonly editingItemId = signal<string | null>(null);
  protected readonly editingItemImageUrl = signal<string | null>(null);
  protected readonly savingItem = signal(false);
  protected readonly uploadingImage = signal(false);
  protected readonly itemError = signal<string | null>(null);

  protected readonly allergens = ALLERGENS;

  protected readonly itemsByCategory = computed(() => {
    const map = new Map<string, MenuItem[]>();
    for (const item of this.items()) {
      const list = map.get(item.category_id) ?? [];
      list.push(item);
      map.set(item.category_id, list);
    }
    return map;
  });

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.loading.set(true);
    Promise.all([this.content.listMenuCategories(this.hotelId), this.content.listMenuItems(this.hotelId)])
      .then(([categories, items]) => {
        this.categories.set(categories);
        this.items.set(items);
        if (!this.itemForm.category_id && categories[0]) {
          this.itemForm = { ...this.itemForm, category_id: categories[0].id };
        }
      })
      .finally(() => this.loading.set(false));
  }

  // -------------------------------------------------------------- category --

  editCategory(cat: MenuCategory): void {
    this.editingCategoryId.set(cat.id);
    this.categoryForm = { name_ka: cat.name_ka, name_en: cat.name_en || '', name_ru: cat.name_ru || '' };
  }

  cancelCategoryEdit(): void {
    this.editingCategoryId.set(null);
    this.categoryForm = { ...BLANK_CATEGORY };
  }

  /** ჩამონათვალის ხელით გადათრევა — ინახავს ახალ sort_order-ს მხოლოდ იმ რიგებისთვის,
   * რომელთა პოზიცია რეალურად შეიცვალა. */
  async dropCategory(event: CdkDragDrop<MenuCategory[]>): Promise<void> {
    const reordered = [...this.categories()];
    moveItemInArray(reordered, event.previousIndex, event.currentIndex);
    this.categories.set(reordered);

    const changed = reordered
      .map((item, index) => ({ item, index }))
      .filter(({ item, index }) => item.sort_order !== index);
    if (changed.length === 0) return;

    await Promise.all(
      changed.map(({ item, index }) => this.content.saveMenuCategory(item.id, { sort_order: index }))
    );
    this.refresh();
  }

  async submitCategory(): Promise<void> {
    this.savingCategory.set(true);
    this.categoryError.set(null);
    try {
      const payload: Record<string, unknown> = { ...this.categoryForm, hotel_id: this.hotelId };
      if (!this.editingCategoryId()) payload['sort_order'] = this.categories().length;
      await this.content.saveMenuCategory(this.editingCategoryId(), payload);
      this.cancelCategoryEdit();
      this.refresh();
    } catch (e) {
      this.categoryError.set((e as Error).message);
    } finally {
      this.savingCategory.set(false);
    }
  }

  async removeCategory(id: string): Promise<void> {
    if (!confirm('წავშალოთ ეს კატეგორია? მისი ყველა კერძიც წაიშლება.')) return;
    await this.content.deleteMenuCategory(id);
    if (this.editingCategoryId() === id) this.cancelCategoryEdit();
    this.refresh();
  }

  // ------------------------------------------------------------------ item --

  editItem(item: MenuItem): void {
    this.editingItemId.set(item.id);
    this.editingItemImageUrl.set(item.image_url);
    this.itemForm = {
      category_id: item.category_id,
      name_ka: item.name_ka,
      name_en: item.name_en || '',
      name_ru: item.name_ru || '',
      description_ka: item.description_ka || '',
      description_en: item.description_en || '',
      description_ru: item.description_ru || '',
      ingredients_ka: item.ingredients_ka || '',
      ingredients_en: item.ingredients_en || '',
      ingredients_ru: item.ingredients_ru || '',
      allergens: [...item.allergens],
      price: item.price,
      currency: item.currency,
      is_available: item.is_available
    };
  }

  cancelItemEdit(): void {
    this.editingItemId.set(null);
    this.editingItemImageUrl.set(null);
    this.itemForm = { ...BLANK_ITEM, category_id: this.categories()[0]?.id ?? '' };
  }

  /** ჩამონათვალის ხელით გადათრევა — ინახავს ახალ sort_order-ს მხოლოდ იმ რიგებისთვის,
   * რომელთა პოზიცია რეალურად შეიცვალა. */
  async dropItem(event: CdkDragDrop<MenuItem[]>): Promise<void> {
    const reordered = [...this.items()];
    moveItemInArray(reordered, event.previousIndex, event.currentIndex);
    this.items.set(reordered);

    const changed = reordered
      .map((item, index) => ({ item, index }))
      .filter(({ item, index }) => item.sort_order !== index);
    if (changed.length === 0) return;

    await Promise.all(changed.map(({ item, index }) => this.content.saveMenuItem(item.id, { sort_order: index })));
    this.refresh();
  }

  async submitItem(): Promise<void> {
    if (!this.itemForm.category_id) {
      this.itemError.set('ჯერ დაამატეთ მინიმუმ ერთი კატეგორია');
      return;
    }

    this.savingItem.set(true);
    this.itemError.set(null);
    try {
      const payload: Record<string, unknown> = { ...this.itemForm, hotel_id: this.hotelId };
      if (!this.editingItemId()) payload['sort_order'] = this.items().length;
      const saved = await this.content.saveMenuItem(this.editingItemId(), payload);
      this.editItem(saved); // ახალი კერძისთვისაც edit-ში ვრჩებით, რომ პირდაპირ ფოტოც აიტვირთოს
      this.refresh();
    } catch (e) {
      this.itemError.set((e as Error).message);
    } finally {
      this.savingItem.set(false);
    }
  }

  toggleAllergen(key: string): void {
    const set = new Set(this.itemForm.allergens);
    set.has(key) ? set.delete(key) : set.add(key);
    this.itemForm.allergens = [...set];
  }

  async onImageSelected(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    const id = this.editingItemId();
    if (!file || !id) return;

    this.uploadingImage.set(true);
    try {
      const url = await this.content.uploadEntityImage(this.hotelId, `menu/${id}.webp`, file);
      await this.content.saveMenuItem(id, { image_url: url });
      this.editingItemImageUrl.set(url);
      this.refresh();
    } catch (e) {
      this.itemError.set((e as Error).message);
    } finally {
      this.uploadingImage.set(false);
    }
  }

  async removeImage(): Promise<void> {
    const id = this.editingItemId();
    if (!id || !confirm('წავშალოთ ეს ფოტო?')) return;

    this.uploadingImage.set(true);
    try {
      await this.content.deleteEntityImage(this.hotelId, `menu/${id}.webp`);
      await this.content.saveMenuItem(id, { image_url: null });
      this.editingItemImageUrl.set(null);
      this.refresh();
    } catch (e) {
      this.itemError.set((e as Error).message);
    } finally {
      this.uploadingImage.set(false);
    }
  }

  async removeItem(id: string): Promise<void> {
    if (!confirm('წავშალოთ ეს კერძი?')) return;
    await this.content.deleteMenuItem(id);
    if (this.editingItemId() === id) this.cancelItemEdit();
    this.refresh();
  }
}
