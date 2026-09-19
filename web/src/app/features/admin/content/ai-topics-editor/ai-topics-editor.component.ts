import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDropList, CdkDrag, CdkDragHandle, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AiTopic, AiTopicTemplate } from '../../../../core/models';
import { AdminContentService } from '../../../../core/services/admin-content.service';
import { AdminHotelContextService } from '../../../../core/services/admin-hotel-context.service';
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

/** AI კონსიერჟის (features/guest/ai) თემების admin რედაქტორი — rules-editor-ის იგივე
 * (list + ერთი inline ფორმა) პატერნი, keywords_ka/en/ru-ის დამატებითი ველებით. რიგითობა
 * აღარ ჩაიწერება ხელით — სია drag-and-drop-ით (@angular/cdk/drag-drop) გადალაგდება. */
@Component({
  selector: 'app-ai-topics-editor',
  standalone: true,
  imports: [FormsModule, IconComponent, IconPickerComponent, CdkDropList, CdkDrag, CdkDragHandle],
  templateUrl: './ai-topics-editor.component.html',
  styleUrl: './ai-topics-editor.component.scss'
})
export class AiTopicsEditorComponent {
  private readonly content = inject(AdminContentService);
  private readonly hotelId = inject(AdminHotelContextService).hotel()!.id;

  protected readonly items = signal<AiTopic[]>([]);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly editingId = signal<string | null>(null);

  protected readonly templates = signal<AiTopicTemplate[]>([]);
  protected readonly showTemplates = signal(false);

  protected form: AiTopicForm = { ...BLANK };

  constructor() {
    this.refresh();
    this.content.listAiTopicTemplates().then((templates) => this.templates.set(templates));
  }

  private refresh(): void {
    this.loading.set(true);
    this.content
      .listAiTopics(this.hotelId)
      .then((items) => this.items.set(items))
      .finally(() => this.loading.set(false));
  }

  toggleTemplates(): void {
    this.showTemplates.update((v) => !v);
  }

  /** შაბლონს ფორმაში აწვდის რედაქტირებისთვის (editingId რჩება null, submit() ახალ
   * hotel-სპეციფიკურ AiTopic-ს შექმნის) — admin-ს შეუძლია submit-მდე შეცვალოს. */
  useTemplate(template: AiTopicTemplate): void {
    this.editingId.set(null);
    this.form = {
      icon: this.iconFor(template.icon),
      title_ka: template.title_ka,
      title_en: template.title_en || '',
      title_ru: template.title_ru || '',
      keywords_ka: toKeywordCsv(template.keywords_ka),
      keywords_en: toKeywordCsv(template.keywords_en),
      keywords_ru: toKeywordCsv(template.keywords_ru),
      answer_ka: template.answer_ka,
      answer_en: template.answer_en || '',
      answer_ru: template.answer_ru || ''
    };
    this.showTemplates.set(false);
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
      answer_ru: item.answer_ru || ''
    };
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.form = { ...BLANK };
  }

  /** ჩამონათვალის ხელით გადათრევა — ინახავს ახალ sort_order-ს მხოლოდ იმ რიგებისთვის,
   * რომელთა პოზიცია რეალურად შეიცვალა. */
  async drop(event: CdkDragDrop<AiTopic[]>): Promise<void> {
    const reordered = [...this.items()];
    moveItemInArray(reordered, event.previousIndex, event.currentIndex);
    this.items.set(reordered);

    const changed = reordered
      .map((item, index) => ({ item, index }))
      .filter(({ item, index }) => item.sort_order !== index);
    if (changed.length === 0) return;

    await Promise.all(changed.map(({ item, index }) => this.content.saveAiTopic(item.id, { sort_order: index })));
    this.refresh();
  }

  async submit(): Promise<void> {
    this.saving.set(true);
    this.error.set(null);
    try {
      const payload: Record<string, unknown> = {
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
        answer_ru: this.form.answer_ru
      };
      if (!this.editingId()) payload['sort_order'] = this.items().length;
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
