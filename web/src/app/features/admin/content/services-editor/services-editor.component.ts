import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HotelService as HotelServiceItem } from '../../../../core/models';
import { AdminContentService } from '../../../../core/services/admin-content.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { DEFAULT_ICON } from '../../../../shared/icon/icon-options';
import { IconPickerComponent } from '../../../../shared/icon-picker/icon-picker.component';

interface ServiceForm {
  icon: string;
  title_ka: string;
  title_en: string;
  title_ru: string;
  description_ka: string;
  description_en: string;
  description_ru: string;
  sort_order: number;
  is_active: boolean;
}

const BLANK: ServiceForm = {
  icon: DEFAULT_ICON,
  title_ka: '',
  title_en: '',
  title_ru: '',
  description_ka: '',
  description_en: '',
  description_ru: '',
  sort_order: 0,
  is_active: true
};

@Component({
  selector: 'app-services-editor',
  standalone: true,
  imports: [FormsModule, IconComponent, IconPickerComponent],
  templateUrl: './services-editor.component.html',
  styleUrl: './services-editor.component.scss'
})
export class ServicesEditorComponent {
  private readonly content = inject(AdminContentService);
  private readonly auth = inject(AuthService);
  private readonly hotelId = this.auth.profile()!.hotel_id!;

  protected readonly items = signal<HotelServiceItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly editingId = signal<string | null>(null);

  protected form: ServiceForm = { ...BLANK };

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.loading.set(true);
    this.content
      .listServices(this.hotelId)
      .then((items) => this.items.set(items))
      .finally(() => this.loading.set(false));
  }

  edit(item: HotelServiceItem): void {
    this.editingId.set(item.id);
    this.form = {
      icon: this.iconFor(item.icon),
      title_ka: item.title_ka,
      title_en: item.title_en || '',
      title_ru: item.title_ru || '',
      description_ka: item.description_ka || '',
      description_en: item.description_en || '',
      description_ru: item.description_ru || '',
      sort_order: item.sort_order,
      is_active: item.is_active
    };
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form = { ...BLANK };
  }

  async submit(): Promise<void> {
    this.saving.set(true);
    this.error.set(null);
    try {
      await this.content.saveService(this.editingId(), { ...this.form, hotel_id: this.hotelId });
      this.cancelEdit();
      this.refresh();
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.saving.set(false);
    }
  }

  async remove(id: string): Promise<void> {
    if (!confirm('წავშალოთ ეს სერვისი?')) return;
    await this.content.deleteService(id);
    if (this.editingId() === id) this.cancelEdit();
    this.refresh();
  }

  iconFor(icon: string | null): string {
    return icon || DEFAULT_ICON;
  }
}
