import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/i18n/language.service';
import { AppLanguage } from '../../core/models';
import { IconComponent } from '../icon/icon.component';

interface LangOption {
  code: AppLanguage;
  label: string;
}

const LANGUAGES: LangOption[] = [
  { code: 'ka', label: 'ქარ' },
  { code: 'en', label: 'ENG' },
  { code: 'ru', label: 'РУС' }
];

/**
 * ენის custom dropdown — თანატოლი 3-ღილაკიანი pill-row-ის ნაცვლად, რომელიც ყოველთვის
 * მთლიანად "გაშლილი" იყო. აქ ჩაკეცილია (მხოლოდ მიმდინარე ენა + chevron ჩანს), იხსნება
 * მხოლოდ დაჭერისას. Native <select> განზრახ არაა გამოყენებული — მისი ბრაუზერ-default
 * გახსნილი მდგომარეობა ვერ ესტილება app-ის დიზაინს.
 */
@Component({
  selector: 'app-lang-dropdown',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './lang-dropdown.component.html',
  styleUrl: './lang-dropdown.component.scss'
})
export class LangDropdownComponent {
  protected readonly language = inject(LanguageService);

  protected readonly languages = LANGUAGES;
  protected readonly open = signal(false);

  protected readonly currentLabel = computed(
    () => this.languages.find((l) => l.code === this.language.lang())?.label ?? ''
  );

  toggle(event: Event): void {
    event.stopPropagation();
    this.open.update((v) => !v);
  }

  select(code: AppLanguage): void {
    this.language.setLang(code);
    this.open.set(false);
  }

  /** click-outside — გარეთ დაჭერისას იხურება; ტრიგერზე/menu-ზე დაჭერა stopPropagation-ით არ აღწევს აქამდე. */
  @HostListener('document:click')
  closeOnOutsideClick(): void {
    this.open.set(false);
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.open.set(false);
  }
}
