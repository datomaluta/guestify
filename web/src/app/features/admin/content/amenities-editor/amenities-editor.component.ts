import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag, CdkDragHandle, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FeaturedAmenity } from '../../../../core/models';
import { AdminContentService } from '../../../../core/services/admin-content.service';
import { AdminHotelContextService } from '../../../../core/services/admin-hotel-context.service';
import { IconComponent } from '../../../../shared/icon/icon.component';

interface AmenityForm {
  title_ka: string;
  title_en: string;
  title_ru: string;
  description_ka: string;
  description_en: string;
  description_ru: string;
  hours_ka: string;
  hours_en: string;
  hours_ru: string;
  is_active: boolean;
}

const BLANK: AmenityForm = {
  title_ka: '',
  title_en: '',
  title_ru: '',
  description_ka: '',
  description_en: '',
  description_ru: '',
  hours_ka: '',
  hours_en: '',
  hours_ru: '',
  is_active: true
};

// ატვირთვისთვის ბარათს ბოლო კადრს ვანიჭებთ 720px-ს (vs ჩვეულებრივი 480px) —
// ეს ბარათი guide/menu-ს მინიატურებზე გაცილებით დიდ ფოტოს (170px სიმაღლის) აჩვენებს.
const AMENITY_IMAGE_MAX_DIMENSION = 720;

/** რიგითობა აღარ ჩაიწერება ხელით — სია drag-and-drop-ით (@angular/cdk/drag-drop)
 * გადალაგდება, drop()-ზე კი reindex-ული sort_order მთელი სიისთვის ერთბაშად ინახება.
 *
 * ფოტო ცხრილში nullable-ია, მაგრამ ატვირთვას row-ის id სჭირდება — ამიტომ ახალი
 * ჩანაწერი ჯერ იქმნება ფოტოს გარეშე, submit()-ის შემდეგ კი edit(saved)-ით ვრჩებით
 * იმავე ჩანაწერზე, რომ პირდაპირ ავტვირთოთ ფოტოც (იხ. guide-editor-ის იგივე ნიმუში). */
@Component({
  selector: 'app-amenities-editor',
  standalone: true,
  imports: [FormsModule, IconComponent, CdkDropList, CdkDrag, CdkDragHandle],
  templateUrl: './amenities-editor.component.html',
  styleUrl: './amenities-editor.component.scss'
})
export class AmenitiesEditorComponent {
  private readonly content = inject(AdminContentService);
  private readonly hotelId = inject(AdminHotelContextService).hotel()!.id;

  protected readonly items = signal<FeaturedAmenity[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly uploadingImage = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly editingId = signal<string | null>(null);
  protected readonly editingImageUrl = signal<string | null>(null);

  protected form: AmenityForm = { ...BLANK };

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.loading.set(true);
    this.content
      .listFeaturedAmenities(this.hotelId)
      .then((items) => this.items.set(items))
      .finally(() => this.loading.set(false));
  }

  edit(item: FeaturedAmenity): void {
    this.editingId.set(item.id);
    this.editingImageUrl.set(item.image_url);
    this.form = {
      title_ka: item.title_ka,
      title_en: item.title_en || '',
      title_ru: item.title_ru || '',
      description_ka: item.description_ka,
      description_en: item.description_en || '',
      description_ru: item.description_ru || '',
      hours_ka: item.hours_ka || '',
      hours_en: item.hours_en || '',
      hours_ru: item.hours_ru || '',
      is_active: item.is_active
    };
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.editingImageUrl.set(null);
    this.form = { ...BLANK };
  }

  /** ჩამონათვალის ხელით გადათრევა — ინახავს ახალ sort_order-ს მხოლოდ იმ რიგებისთვის,
   * რომელთა პოზიცია რეალურად შეიცვალა. */
  async drop(event: CdkDragDrop<FeaturedAmenity[]>): Promise<void> {
    const reordered = [...this.items()];
    moveItemInArray(reordered, event.previousIndex, event.currentIndex);
    this.items.set(reordered);

    const changed = reordered
      .map((item, index) => ({ item, index }))
      .filter(({ item, index }) => item.sort_order !== index);
    if (changed.length === 0) return;

    await Promise.all(
      changed.map(({ item, index }) => this.content.saveFeaturedAmenity(item.id, { sort_order: index }))
    );
    this.refresh();
  }

  async submit(): Promise<void> {
    this.saving.set(true);
    this.error.set(null);
    try {
      const payload: Record<string, unknown> = { ...this.form, hotel_id: this.hotelId };
      if (!this.editingId()) payload['sort_order'] = this.items().length;
      const saved = await this.content.saveFeaturedAmenity(this.editingId(), payload);
      this.edit(saved); // ახალი ჩანაწერისთვისაც edit-ში გადავდივართ, რომ პირდაპირ ფოტოც აიტვირთოს
      this.refresh();
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.saving.set(false);
    }
  }

  async onImageSelected(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    const id = this.editingId();
    if (!file || !id) return;

    this.uploadingImage.set(true);
    try {
      const url = await this.content.uploadEntityImage(
        this.hotelId,
        `amenities/${id}.webp`,
        file,
        AMENITY_IMAGE_MAX_DIMENSION
      );
      await this.content.saveFeaturedAmenity(id, { image_url: url });
      this.editingImageUrl.set(url);
      this.refresh();
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.uploadingImage.set(false);
    }
  }

  async removeImage(): Promise<void> {
    const id = this.editingId();
    if (!id || !confirm('წავშალოთ ეს ფოტო?')) return;

    this.uploadingImage.set(true);
    try {
      await this.content.deleteEntityImage(this.hotelId, `amenities/${id}.webp`);
      await this.content.saveFeaturedAmenity(id, { image_url: null });
      this.editingImageUrl.set(null);
      this.refresh();
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.uploadingImage.set(false);
    }
  }

  async remove(id: string): Promise<void> {
    if (!confirm('წავშალოთ ეს სერვისი?')) return;
    await this.content.deleteFeaturedAmenity(id);
    if (this.editingId() === id) this.cancelEdit();
    this.refresh();
  }
}
