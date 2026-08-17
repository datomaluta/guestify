import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from './language.service';
import { localize } from '../models';

/**
 * ბაზიდან წამოსული მრავალენოვანი კონტენტის თარგმანი:
 * {{ service | localize:'title' }} → title_ka / title_en / title_ru, მიმდინარე ენის მიხედვით.
 * pure: false — რომ ენის გადართვისთანავე თემპლეიტმა თავად განაახლოს ტექსტი.
 */
@Pipe({ name: 'localize', pure: false, standalone: true })
export class LocalizePipe implements PipeTransform {
  private readonly language = inject(LanguageService);

  transform(item: Record<string, any> | null | undefined, field: string): string {
    if (!item) return '';
    return localize(item, field, this.language.lang());
  }
}
