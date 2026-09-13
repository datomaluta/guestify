import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiTopic } from '../../../../core/models';
import { AdminContentService } from '../../../../core/services/admin-content.service';
import { AuthService } from '../../../../core/services/auth.service';
import { IconComponent } from '../../../../shared/icon/icon.component';
import { DEFAULT_ICON } from '../../../../shared/icon/icon-options';
import { IconPickerComponent } from '../../../../shared/icon-picker/icon-picker.component';

/** keywords_* ფორმაში მძიმით გამოყოფილი ერთი ველია (არა მასივი) — არცერთ სხვა admin
 * ფორმას string[]-ის შესაყვანი კომპონენტი არ აქვს, ეს უმარტივესი გზაა ახლისი გამოგონების
 * გარეშე. submit()-ზე იშლება მასივად, edit()-ზე კი უკან join(', ')-ით იკრიბება. */
interface AiTopicForm {
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
  sort_order: number;
}

const BLANK: AiTopicForm = {
  icon: DEFAULT_ICON,
  title_ka: '',
  title_en: '',
  title_ru: '',
  keywords_ka: '',
  keywords_en: '',
  keywords_ru: '',
  answer_ka: '',
  answer_en: '',
  answer_ru: '',
  sort_order: 0
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

/** AI კონსიერჟის (features/guest/ai) თემების admin რედაქტორი — rules-editor-ის იგივე
 * (list + ერთი inline ფორმა) პატერნი, keywords_ka/en/ru-ის დამატებითი ველებით. */
@Component({
  selector: 'app-ai-topics-editor',
  standalone: true,
  imports: [FormsModule, IconComponent, IconPickerComponent],
  templateUrl: './ai-topics-editor.component.html',
  styleUrl: './ai-topics-editor.component.scss'
})
export class AiTopicsEditorComponent {
  private readonly content = inject(AdminContentService);
  private readonly auth = inject(AuthService);
  private readonly hotelId = this.auth.profile()!.hotel_id!;

  protected readonly items = signal<AiTopic[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly editingId = signal<string | null>(null);

  protected form: AiTopicForm = { ...BLANK };

  constructor() {
    this.refresh();
  }

  private refresh(): void {
    this.loading.set(true);
    this.content
      .listAiTopics(this.hotelId)
      .then((items) => this.items.set(items))
      .finally(() => this.loading.set(false));
  }

  edit(item: AiTopic): void {
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
      answer_ru: item.answer_ru || '',
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
      const payload = {
        hotel_id: this.hotelId,
        icon: this.form.icon,
        title_ka: this.form.title_ka,
        title_en: this.form.title_en,
        title_ru: this.form.title_ru,
        keywords_ka: toKeywordArray(this.form.keywords_ka),
        keywords_en: toKeywordArray(this.form.keywords_en),
        keywords_ru: toKeywordArray(this.form.keywords_ru),
        answer_ka: this.form.answer_ka,
        answer_en: this.form.answer_en,
        answer_ru: this.form.answer_ru,
        sort_order: this.form.sort_order
      };
      await this.content.saveAiTopic(this.editingId(), payload);
      this.cancelEdit();
      this.refresh();
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.saving.set(false);
    }
  }

  async remove(id: string): Promise<void> {
    if (!confirm('წავშალოთ ეს თემა?')) return;
    await this.content.deleteAiTopic(id);
    if (this.editingId() === id) this.cancelEdit();
    this.refresh();
  }

  iconFor(icon: string | null): string {
    return icon || DEFAULT_ICON;
  }
}
