import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag, CdkDragHandle, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HotelContact } from '../../../../core/models';
import { AdminContentService } from '../../../../core/services/admin-content.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IconComponent } from '../../../../shared/icon/icon.component';

interface ContactForm {
  label_ka: string;
  label_en: string;
  label_ru: string;
  phone: string;
}

const BLANK: ContactForm = { label_ka: '', label_en: '', label_ru: '', phone: '' };

/** რიგითობა აღარ ჩაიწერება ხელით — სია drag-and-drop-ით (@angular/cdk/drag-drop)
 * გადალაგდება, drop()-ზე კი reindex-ული sort_order მთელი სიისთვის ერთბაშად ინახება. */
@Component({
  selector: 'app-contacts-editor',
  standalone: true,
  imports: [FormsModule, IconComponent, CdkDropList, CdkDrag, CdkDragHandle],
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
      phone: item.phone
    };
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form = { ...BLANK };
  }

  /** ჩამონათვალის ხელით გადათრევა — ინახავს ახალ sort_order-ს მხოლოდ იმ რიგებისთვის,
   * რომელთა პოზიცია რეალურად შეიცვალა. */
  async drop(event: CdkDragDrop<HotelContact[]>): Promise<void> {
    const reordered = [...this.items()];
    moveItemInArray(reordered, event.previousIndex, event.currentIndex);
    this.items.set(reordered);

    const changed = reordered
      .map((item, index) => ({ item, index }))
      .filter(({ item, index }) => item.sort_order !== index);
    if (changed.length === 0) return;

    await Promise.all(changed.map(({ item, index }) => this.content.saveContact(item.id, { sort_order: index })));
    this.refresh();
  }

  async submit(): Promise<void> {
    this.saving.set(true);
    this.error.set(null);
    try {
      const payload: Record<string, unknown> = { ...this.form, hotel_id: this.hotelId };
      if (!this.editingId()) payload['sort_order'] = this.items().length;
      await this.content.saveContact(this.editingId(), payload);
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
