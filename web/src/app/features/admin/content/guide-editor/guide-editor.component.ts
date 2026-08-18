import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuidePlace } from '../../../../core/models';
import { AdminContentService } from '../../../../core/services/admin-content.service';
import { AuthService } from '../../../../core/services/auth.service';

interface PlaceForm {
  category: string;
  name_ka: string;
  name_en: string;
  name_ru: string;
  description_ka: string;
  description_en: string;
  description_ru: string;
  google_maps_url: string;
  sort_order: number;
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
  sort_order: 0
};

@Component({
  selector: 'app-guide-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './guide-editor.component.html',
  styleUrl: './guide-editor.component.scss'
})
export class GuideEditorComponent {
  private readonly content = inject(AdminContentService);
  private readonly auth = inject(AuthService);
  private readonly hotelId = this.auth.profile()!.hotel_id!;

  protected readonly categories = ['attraction', 'restaurant', 'shop', 'transport'];

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
      sort_order: item.sort_order
    };
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.editingImageUrl.set(null);
    this.form = { ...BLANK };
  }

  async submit(): Promise<void> {
    this.saving.set(true);
    this.error.set(null);
    try {
      const saved = await this.content.saveGuidePlace(this.editingId(), { ...this.form, hotel_id: this.hotelId });
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

  async remove(id: string): Promise<void> {
    if (!confirm('წავშალოთ ეს ადგილი?')) return;
    await this.content.deleteGuidePlace(id);
    if (this.editingId() === id) this.cancelEdit();
    this.refresh();
  }
}
