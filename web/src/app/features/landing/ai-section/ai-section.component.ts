import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';

interface AiLanguage {
  code: string;
  key: string;
  active?: boolean;
}

@Component({
  selector: 'app-ai-section',
  standalone: true,
  imports: [TranslatePipe, IconComponent],
  templateUrl: './ai-section.component.html',
  styleUrl: './ai-section.component.scss'
})
export class AiSectionComponent {
  protected readonly languages: AiLanguage[] = [
    { code: 'GE', key: 'landing_ai_lang_ka', active: true },
    { code: 'EN', key: 'landing_ai_lang_en' },
    { code: 'RU', key: 'landing_ai_lang_ru' }
  ];
}
