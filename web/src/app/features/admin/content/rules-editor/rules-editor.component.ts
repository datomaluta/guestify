import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag, CdkDragHandle, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HotelRule } from '../../../../core/models';
import { AdminContentService } from '../../../../core/services/admin-content.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { DEFAULT_ICON } from '../../../../shared/icon/icon-options';
import { IconPickerComponent } from '../../../../shared/icon-picker/icon-picker.component';

interface RuleForm {
  icon: string;
  title_ka: string;
  title_en: string;
  title_ru: string;
}

const BLANK: RuleForm = {
  icon: DEFAULT_ICON,
  title_ka: '',
  title_en: '',
  title_ru: ''
};

/** რიგითობა აღარ ჩაიწერება ხელით — სია drag-and-drop-ით (@angular/cdk/drag-drop)
 * გადალაგდება, drop()-ზე კი reindex-ული sort_order მთელი სიისთვის ერთბაშად ინახება. */
@Component({
  selector: 'app-rules-editor',
  standalone: true,
  imports: [FormsModule, IconComponent, IconPickerComponent, CdkDropList, CdkDrag, CdkDragHandle],
  templateUrl: './rules-editor.component.html',
  styleUrl: './rules-editor.component.scss'
})
export class RulesEditorComponent {
  private readonly content = inject(AdminContentService);
  private readonly auth = inject(AuthService);
  private readonly hotelId = this.auth.profile()!.hotel_id!;

  protected readonly items = signal<HotelRule[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly editingId = signal<string | null>(null);

  protected form: RuleForm = { ...BLANK };

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.loading.set(true);
    this.content
      .listRules(this.hotelId)
      .then((items) => this.items.set(items))
      .finally(() => this.loading.set(false));
  }

  edit(item: HotelRule): void {
    this.editingId.set(item.id);
    this.form = {
      icon: this.iconFor(item.icon),
      title_ka: item.title_ka,
      title_en: item.title_en || '',
      title_ru: item.title_ru || ''
    };
  }

  /** ჩამონათვალის ხელით გადათრევა — ინახავს ახალ sort_order-ს მხოლოდ იმ რიგებისთვის,
   * რომელთა პოზიცია რეალურად შეიცვალა. */
  async drop(event: CdkDragDrop<HotelRule[]>): Promise<void> {
    const reordered = [...this.items()];
    moveItemInArray(reordered, event.previousIndex, event.currentIndex);
    this.items.set(reordered);

    const changed = reordered
      .map((item, index) => ({ item, index }))
      .filter(({ item, index }) => item.sort_order !== index);
    if (changed.length === 0) return;

    await Promise.all(changed.map(({ item, index }) => this.content.saveRule(item.id, { sort_order: index })));
    this.refresh();
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form = { ...BLANK };
  }

  async submit(): Promise<void> {
    this.saving.set(true);
    this.error.set(null);
    try {
      const payload: Record<string, unknown> = { ...this.form, hotel_id: this.hotelId };
      if (!this.editingId()) payload['sort_order'] = this.items().length;
      await this.content.saveRule(this.editingId(), payload);
      this.cancelEdit();
      this.refresh();
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.saving.set(false);
    }
  }

  async remove(id: string): Promise<void> {
    if (!confirm('წავშალოთ ეს წესი?')) return;
    await this.content.deleteRule(id);
    if (this.editingId() === id) this.cancelEdit();
    this.refresh();
  }

  iconFor(icon: string | null): string {
    return icon || DEFAULT_ICON;
  }
}
