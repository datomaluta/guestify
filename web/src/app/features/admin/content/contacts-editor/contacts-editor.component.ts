import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HotelContact } from '../../../../core/models';
import { AdminContentService } from '../../../../core/services/admin-content.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IconComponent } from '../../../../shared/icon/icon.component';

interface ContactForm {
  label_ka: string;
  label_en: string;
  label_ru: string;
  phone: string;
  sort_order: number;
}

const BLANK: ContactForm = { label_ka: '', label_en: '', label_ru: '', phone: '', sort_order: 0 };

@Component({
  selector: 'app-contacts-editor',
  standalone: true,
  imports: [FormsModule, IconComponent],
  templateUrl: './contacts-editor.component.html',
  styleUrl: './contacts-editor.component.scss'
})
export class ContactsEditorComponent {
  private readonly content = inject(AdminContentService);
  private readonly auth = inject(AuthService);
  private readonly hotelId = this.auth.profile()!.hotel_id!;

  protected readonly items = signal<HotelContact[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly editingId = signal<string | null>(null);

  protected form: ContactForm = { ...BLANK };

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.loading.set(true);
    this.content
      .listContacts(this.hotelId)
      .then((items) => this.items.set(items))
      .finally(() => this.loading.set(false));
  }

  edit(item: HotelContact): void {
    this.editingId.set(item.id);
    this.form = {
      label_ka: item.label_ka,
      label_en: item.label_en || '',
      label_ru: item.label_ru || '',
      phone: item.phone,
      sort_order: item.sort_order
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
      await this.content.saveContact(this.editingId(), { ...this.form, hotel_id: this.hotelId });
      this.cancelEdit();
      this.refresh();
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.saving.set(false);
    }
  }

  async remove(id: string): Promise<void> {
    if (!confirm('წავშალოთ ეს კონტაქტი?')) return;
    await this.content.deleteContact(id);
    if (this.editingId() === id) this.cancelEdit();
    this.refresh();
  }
}
