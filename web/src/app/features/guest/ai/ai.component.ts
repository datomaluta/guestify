import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

/**
 * Bottom nav-ის "AI" ტაბი — მხოლოდ premium პაკეტზე ჩანს (იხ. bottom-nav.component).
 * ჯერჯერობით ჩონჩხია, რეალური AI კონსიერჟი მოგვიანებით დაემატება.
 */
@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.scss'
})
export class AiComponent {}
