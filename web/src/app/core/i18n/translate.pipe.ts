import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from './language.service';

/**
 * სტატიკური UI ტექსტების თარგმანი: {{ 'nav_services' | translate }}
 * pure: false — რომ ენის გადართვისთანავე თემპლეიტმა თავად განაახლოს ტექსტი.
 */
@Pipe({ name: 'translate', pure: false, standalone: true })
export class TranslatePipe implements PipeTransform {
  private readonly language = inject(LanguageService);

  transform(key: string): string {
    return this.language.t(key);
  }
}
