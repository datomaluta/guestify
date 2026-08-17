import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { LanguageService } from '../../../core/i18n/language.service';
import { AppLanguage } from '../../../core/models';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-guest-shell',
  standalone: true,
  imports: [RouterOutlet, TranslatePipe],
  templateUrl: './guest-shell.component.html',
  styleUrl: './guest-shell.component.scss'
})
export class GuestShellComponent {
  protected readonly hotelContext = inject(HotelContextService);
  protected readonly language = inject(LanguageService);

  protected readonly languages: { code: AppLanguage; label: string }[] = [
    { code: 'ka', label: 'ქარ' },
    { code: 'en', label: 'ENG' },
    { code: 'ru', label: 'РУС' }
  ];

  setLang(lang: AppLanguage): void {
    this.language.setLang(lang);
  }

  logoInitial(): string {
    return this.hotelContext.hotel()?.name?.charAt(0)?.toUpperCase() ?? '?';
  }
}
