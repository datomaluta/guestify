import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

/**
 * Bottom nav-ის "Essentials" ტაბი — მომავალში აქ გაერთიანდება rules/services
 * (და host-ის საკონტაქტო ინფო). ჯერჯერობით ჩონჩხია, კონტენტი მოგვიანებით მოემატება.
 */
@Component({
  selector: 'app-essentials',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './essentials.component.html',
  styleUrl: './essentials.component.scss'
})
export class EssentialsComponent {}
