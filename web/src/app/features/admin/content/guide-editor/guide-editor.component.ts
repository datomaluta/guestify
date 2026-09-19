import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag, CdkDragHandle, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GuidePlace } from '../../../../core/models';
import { AdminContentService } from '../../../../core/services/admin-content.service';
import { AdminHotelContextService } from '../../../../core/services/admin-hotel-context.service';
import { IconComponent } from '../../../../shared/icon/icon.component';

interface PlaceForm {
  category: string;
  name_ka: string;
  name_en: string;
  name_ru: string;
  description_ka: string;
  description_en: string;
  description_ru: string;
  google_maps_url: string;
  walk_minutes: number | null;
}

const BLANK: PlaceForm = {
  category: 'attraction',
  name_ka: '',
  name_en: '',
  name_ru: '',
  description_ka: '',
  description_en: '',
  description_ru: '',
  google_maps_url: '',
  walk_minutes: null
};

/** რიგითობა აღარ ჩაიწერება ხელით — სია drag-and-drop-ით (@angular/cdk/drag-drop)
 * გადალაგდება, drop()-ზე კი reindex-ული sort_order მთელი სიისთვის ერთბაშად ინახება. */
@Component({
  selector: 'app-guide-editor',
  standalone: true,
  imports: [FormsModule, IconComponent, CdkDropList, CdkDrag, CdkDragHandle],
  templateUrl: './guide-editor.component.html',
  styleUrl: './guide-editor.component.scss'
})
export class GuideEditorComponent {
  private readonly content = inject(AdminContentService);
  private readonly hotelId = inject(AdminHotelContextService).hotel()!.id;

  protected readonly categories = ['cafe', 'restaurant', 'experience', 'attraction', 'shop'];

  protected readonly items = signal<GuidePlace[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly uploadingImage = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly editingId = signal<string | null>(null);
  protected readonly editingImageUrl = signal<string | null>(null);

  protected form: PlaceForm = { ...BLANK };

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.loading.set(true);
    this.content
      .listGuidePlaces(this.hotelId)
      .then((items) => this.items.set(items))
      .finally(() => this.loading.set(false));
  }

  edit(item: GuidePlace): void {
    this.editingId.set(item.id);
    this.editingImageUrl.set(item.image_url);
    this.form = {
      category: item.category || 'attraction',
      name_ka: item.name_ka,
      name_en: item.name_en || '',
      name_ru: item.name_ru || '',
      description_ka: item.description_ka || '',
      description_en: item.description_en || '',
      description_ru: item.description_ru || '',
      google_maps_url: item.google_maps_url || '',
      walk_minutes: item.walk_minutes
    };
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.editingImageUrl.set(null);
    this.form = { ...BLANK };
  }

  /** ჩამონათვალის ხელით გადათრევა — ინახავს ახალ sort_order-ს მხოლოდ იმ რიგებისთვის,
   * რომელთა პოზიცია რეალურად შეიცვალა. */
  async drop(event: CdkDragDrop<GuidePlace[]>): Promise<void> {
    const reordered = [...this.items()];
    moveItemInArray(reordered, event.previousIndex, event.currentIndex);
    this.items.set(reordered);

    const changed = reordered
      .map((item, index) => ({ item, index }))
      .filter(({ item, index }) => item.sort_order !== index);
    if (changed.length === 0) return;

    await Promise.all(changed.map(({ item, index }) => this.content.saveGuidePlace(item.id, { sort_order: index })));
    this.refresh();
  }

  async submit(): Promise<void> {
    this.saving.set(true);
    this.error.set(null);
    try {
      const payload: Record<string, unknown> = { ...this.form, hotel_id: this.hotelId };
      if (!this.editingId()) payload['sort_order'] = this.items().length;
      const saved = await this.content.saveGuidePlace(this.editingId(), payload);
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
      const url = await this.content.uploadEntityImage(this.hotelId, `guide/${id}.webp`, file);
      await this.content.saveGuidePlace(id, { image_url: url });
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
      await this.content.deleteEntityImage(this.hotelId, `guide/${id}.webp`);
      await this.content.saveGuidePlace(id, { image_url: null });
      this.editingImageUrl.set(null);
      this.refresh();
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.uploadingImage.set(false);
    }
  }

  async remove(id: string): Promise<void> {
    if (!confirm('წავშალოთ ეს ადგილი?')) return;
    await this.content.deleteGuidePlace(id);
    if (this.editingId() === id) this.cancelEdit();
    this.refresh();
  }
}
