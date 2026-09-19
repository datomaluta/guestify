import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag, CdkDragHandle, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AiTopicTemplate } from '../../../core/models';
import { AdminContentService } from '../../../core/services/admin-content.service';
import { IconComponent } from '../../../shared/icon/icon.component';
import { DEFAULT_ICON } from '../../../shared/icon/icon-options';
import { IconPickerComponent } from '../../../shared/icon-picker/icon-picker.component';

/** ai-topics-editor.component.ts-ის იგივე keywords CSV-კონვენცია. */
interface AiTopicTemplateForm {
  icon: string;
  title_ka: string;
  title_en: string;
  title_ru: string;
  keywords_ka: string;
  keywords_en: string;
  keywords_ru: string;
  answer_ka: string;
  answer_en: string;
  answer_ru: string;
}

const BLANK: AiTopicTemplateForm = {
  icon: DEFAULT_ICON,
  title_ka: '',
  title_en: '',
  title_ru: '',
  keywords_ka: '',
  keywords_en: '',
  keywords_ru: '',
  answer_ka: '',
  answer_en: '',
  answer_ru: ''
};

function toKeywordArray(csv: string): string[] {
  return csv
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function toKeywordCsv(list: string[]): string {
  return list.join(', ');
}

/** Superadmin-ის მართული, hotel_id-ის გარეშე AI თემების შაბლონების ბიბლიოთეკა
 * (Supabase `ai_topic_templates`, 0013) — hotel_admin-ები ai-topics-editor-დან
 * "დაამატე ბიბლიოთეკიდან" ღილაკით საკუთარ თემად აკოპირებენ. ai-topics-editor-ის
 * იგივე (list + ერთი inline ფორმა) პატერნი, hotel_id-ის გარეშე. */
@Component({
  selector: 'app-ai-topic-templates',
  standalone: true,
  imports: [FormsModule, IconComponent, IconPickerComponent, CdkDropList, CdkDrag, CdkDragHandle],
  templateUrl: './ai-topic-templates.component.html',
  styleUrl: './ai-topic-templates.component.scss'
})
export class AiTopicTemplatesComponent {
  private readonly content = inject(AdminContentService);

  protected readonly items = signal<AiTopicTemplate[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly editingId = signal<string | null>(null);

  protected form: AiTopicTemplateForm = { ...BLANK };

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.loading.set(true);
    this.content
      .listAiTopicTemplates()
      .then((items) => this.items.set(items))
      .finally(() => this.loading.set(false));
  }

  edit(item: AiTopicTemplate): void {
    this.editingId.set(item.id);
    this.form = {
      icon: this.iconFor(item.icon),
      title_ka: item.title_ka,
      title_en: item.title_en || '',
      title_ru: item.title_ru || '',
      keywords_ka: toKeywordCsv(item.keywords_ka),
      keywords_en: toKeywordCsv(item.keywords_en),
      keywords_ru: toKeywordCsv(item.keywords_ru),
      answer_ka: item.answer_ka,
      answer_en: item.answer_en || '',
      answer_ru: item.answer_ru || ''
    };
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form = { ...BLANK };
  }

  /** ჩამონათვალის ხელით გადათრევა — ინახავს ახალ sort_order-ს მხოლოდ იმ რიგებისთვის,
   * რომელთა პოზიცია რეალურად შეიცვალა. */
  async drop(event: CdkDragDrop<AiTopicTemplate[]>): Promise<void> {
    const reordered = [...this.items()];
    moveItemInArray(reordered, event.previousIndex, event.currentIndex);
    this.items.set(reordered);

    const changed = reordered
      .map((item, index) => ({ item, index }))
      .filter(({ item, index }) => item.sort_order !== index);
    if (changed.length === 0) return;

    await Promise.all(
      changed.map(({ item, index }) => this.content.saveAiTopicTemplate(item.id, { sort_order: index }))
    );
    this.refresh();
  }

  async submit(): Promise<void> {
    this.saving.set(true);
    this.error.set(null);
    try {
      const payload: Record<string, unknown> = {
        icon: this.form.icon,
        title_ka: this.form.title_ka,
        title_en: this.form.title_en,
        title_ru: this.form.title_ru,
        keywords_ka: toKeywordArray(this.form.keywords_ka),
        keywords_en: toKeywordArray(this.form.keywords_en),
        keywords_ru: toKeywordArray(this.form.keywords_ru),
        answer_ka: this.form.answer_ka,
        answer_en: this.form.answer_en,
        answer_ru: this.form.answer_ru
      };
      if (!this.editingId()) payload['sort_order'] = this.items().length;
      await this.content.saveAiTopicTemplate(this.editingId(), payload);
      this.cancelEdit();
      this.refresh();
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.saving.set(false);
    }
  }

  async remove(id: string): Promise<void> {
    if (!confirm('წავშალოთ ეს შაბლონი?')) return;
    await this.content.deleteAiTopicTemplate(id);
    if (this.editingId() === id) this.cancelEdit();
    this.refresh();
  }

  iconFor(icon: string | null): string {
    return icon || DEFAULT_ICON;
  }
}
