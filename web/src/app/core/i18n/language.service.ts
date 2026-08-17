import { Injectable, signal } from '@angular/core';
import { AppLanguage } from '../models';
import { TRANSLATIONS } from './translations';

const STORAGE_KEY = 'guestify_lang';
const SUPPORTED: AppLanguage[] = ['ka', 'en', 'ru'];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly lang = signal<AppLanguage>(this.readInitialLang());

  setLang(lang: AppLanguage): void {
    this.lang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  /** სასტუმროს default_language-ს იყენებს მხოლოდ მაშინ, თუ სტუმარს ჯერ არ აურჩევია ენა ხელით. */
  applyHotelDefault(defaultLang: AppLanguage): void {
    if (!localStorage.getItem(STORAGE_KEY)) {
      this.lang.set(defaultLang);
    }
  }

  /** სტატიკური UI ტექსტის თარგმანი (nav ლეიბლები, ღილაკები, სტატუსები). */
  t(key: string): string {
    return TRANSLATIONS[key]?.[this.lang()] ?? key;
  }

  private readInitialLang(): AppLanguage {
    const stored = localStorage.getItem(STORAGE_KEY) as AppLanguage | null;
    return stored && SUPPORTED.includes(stored) ? stored : 'ka';
  }
}
