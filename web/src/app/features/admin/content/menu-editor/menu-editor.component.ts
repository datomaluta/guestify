import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuCategory, MenuItem } from '../../../../core/models';
import { AdminContentService } from '../../../../core/services/admin-content.service';
import { AuthService } from '../../../../core/services/auth.service';

interface CategoryForm {
  name_ka: string;
  name_en: string;
  name_ru: string;
  sort_order: number;
}

interface ItemForm {
  category_id: string;
  name_ka: string;
  name_en: string;
  name_ru: string;
  description_ka: string;
  description_en: string;
  description_ru: string;
  price: number;
  currency: string;
  is_available: boolean;
  sort_order: number;
}

const BLANK_CATEGORY: CategoryForm = { name_ka: '', name_en: '', name_ru: '', sort_order: 0 };

const BLANK_ITEM: ItemForm = {
  category_id: '',
  name_ka: '',
  name_en: '',
  name_ru: '',
  description_ka: '',
  description_en: '',
  description_ru: '',
  price: 0,
  currency: 'GEL',
  is_available: true,
  sort_order: 0
};

@Component({
  selector: 'app-menu-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './menu-editor.component.html',
  styleUrl: './menu-editor.component.scss'
})
export class MenuEditorComponent {
  private readonly content = inject(AdminContentService);
  private readonly auth = inject(AuthService);
  private readonly hotelId = this.auth.profile()!.hotel_id!;

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
    this.categoryForm = { name_ka: cat.name_ka, name_en: cat.name_en || '', name_ru: cat.name_ru || '', sort_order: cat.sort_order };
  }

  cancelCategoryEdit(): void {
    this.editingCategoryId.set(null);
    this.categoryForm = { ...BLANK_CATEGORY };
  }

  async submitCategory(): Promise<void> {
    this.savingCategory.set(true);
    this.categoryError.set(null);
    try {
      await this.content.saveMenuCategory(this.editingCategoryId(), { ...this.categoryForm, hotel_id: this.hotelId });
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
      price: item.price,
      currency: item.currency,
      is_available: item.is_available,
      sort_order: item.sort_order
    };
  }

  cancelItemEdit(): void {
    this.editingItemId.set(null);
    this.editingItemImageUrl.set(null);
    this.itemForm = { ...BLANK_ITEM, category_id: this.categories()[0]?.id ?? '' };
  }

  async submitItem(): Promise<void> {
    if (!this.itemForm.category_id) {
      this.itemError.set('ჯერ დაამატეთ მინიმუმ ერთი კატეგორია');
      return;
    }

    this.savingItem.set(true);
    this.itemError.set(null);
    try {
      const saved = await this.content.saveMenuItem(this.editingItemId(), { ...this.itemForm, hotel_id: this.hotelId });
      this.editItem(saved); // ახალი კერძისთვისაც edit-ში ვრჩებით, რომ პირდაპირ ფოტოც აიტვირთოს
      this.refresh();
    } catch (e) {
      this.itemError.set((e as Error).message);
    } finally {
      this.savingItem.set(false);
    }
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
