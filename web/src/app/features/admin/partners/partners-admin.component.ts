import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag, CdkDragHandle, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Partner } from '../../../core/models';
import { AdminContentService } from '../../../core/services/admin-content.service';
import { IconComponent } from '../../../shared/icon/icon.component';

interface PartnerForm {
  name: string;
  google_rating: number | null;
  google_review_count: number | null;
  featured: boolean;
  is_active: boolean;
}

const BLANK: PartnerForm = {
  name: '',
  google_rating: null,
  google_review_count: null,
  featured: false,
  is_active: true
};

/** Superadmin-ის მართული პარტნიორი სასტუმროები (Supabase `partners`, 0021) — ლენდინგის
 * Partners სექცია (`featured`) და /partners გვერდი (ყველა აქტიური).
 *
 * amenities-editor-ის იგივე ნიმუში: ფოტოს ატვირთვას row-ის id სჭირდება, ამიტომ ახალი
 * ჩანაწერი ჯერ ფოტოს გარეშე იქმნება, submit()-ის შემდეგ კი edit(saved)-ით ვრჩებით იმავე
 * ჩანაწერზე, რომ პირდაპირ ფოტოც აიტვირთოს. */
@Component({
  selector: 'app-partners-admin',
  standalone: true,
  imports: [FormsModule, IconComponent, CdkDropList, CdkDrag, CdkDragHandle],
  templateUrl: './partners-admin.component.html',
  styleUrl: './partners-admin.component.scss'
})
export class PartnersAdminComponent {
  private readonly content = inject(AdminContentService);

  protected readonly items = signal<Partner[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly uploadingImage = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly editingId = signal<string | null>(null);
  protected readonly editingImageUrl = signal<string | null>(null);

  protected form: PartnerForm = { ...BLANK };

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.loading.set(true);
    this.content
      .listPartners()
      .then((items) => this.items.set(items))
      .finally(() => this.loading.set(false));
  }

  edit(item: Partner): void {
    this.editingId.set(item.id);
    this.editingImageUrl.set(item.image_url);
    this.form = {
      name: item.name,
      google_rating: item.google_rating,
      google_review_count: item.google_review_count,
      featured: item.featured,
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
  async drop(event: CdkDragDrop<Partner[]>): Promise<void> {
    const reordered = [...this.items()];
    moveItemInArray(reordered, event.previousIndex, event.currentIndex);
    this.items.set(reordered);

    const changed = reordered
      .map((item, index) => ({ item, index }))
      .filter(({ item, index }) => item.sort_order !== index);
    if (changed.length === 0) return;

    await Promise.all(changed.map(({ item, index }) => this.content.savePartner(item.id, { sort_order: index })));
    this.refresh();
  }

  async submit(): Promise<void> {
    this.saving.set(true);
    this.error.set(null);
    try {
      // ცარიელი number input ngModel-ში null-ად ან ''-ად მოდის — ორივე null-ად ინახება
      const payload: Record<string, unknown> = {
        name: this.form.name.trim(),
        google_rating: this.form.google_rating || null,
        google_review_count: this.form.google_review_count ?? null,
        featured: this.form.featured,
        is_active: this.form.is_active
      };
      if (!this.editingId()) payload['sort_order'] = this.items().length;
      const saved = await this.content.savePartner(this.editingId(), payload);
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
      const url = await this.content.uploadSiteImage(`partners/${id}.webp`, file);
      await this.content.savePartner(id, { image_url: url });
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
      await this.content.deleteSiteImage(`partners/${id}.webp`);
      await this.content.savePartner(id, { image_url: null });
      this.editingImageUrl.set(null);
      this.refresh();
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.uploadingImage.set(false);
    }
  }

  async remove(item: Partner): Promise<void> {
    if (!confirm(`წავშალოთ "${item.name}"?`)) return;
    if (item.image_url) await this.content.deleteSiteImage(`partners/${item.id}.webp`);
    await this.content.deletePartner(item.id);
    if (this.editingId() === item.id) this.cancelEdit();
    this.refresh();
  }
}
