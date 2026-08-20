import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  content_ka: string;
  content_en: string;
  content_ru: string;
  sort_order: number;
}

const BLANK: RuleForm = {
  icon: DEFAULT_ICON,
  title_ka: '',
  title_en: '',
  title_ru: '',
  content_ka: '',
  content_en: '',
  content_ru: '',
  sort_order: 0
};

@Component({
  selector: 'app-rules-editor',
  standalone: true,
  imports: [FormsModule, IconComponent, IconPickerComponent],
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
      title_ru: item.title_ru || '',
      content_ka: item.content_ka || '',
      content_en: item.content_en || '',
      content_ru: item.content_ru || '',
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
      await this.content.saveRule(this.editingId(), { ...this.form, hotel_id: this.hotelId });
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
