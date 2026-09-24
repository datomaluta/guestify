import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-before-after-section',
  standalone: true,
  imports: [TranslatePipe, IconComponent, RevealDirective],
  templateUrl: './before-after-section.component.html',
  styleUrl: './before-after-section.component.scss'
})
export class BeforeAfterSectionComponent {
  protected readonly beforeItems = ['landing_ba_before1', 'landing_ba_before2', 'landing_ba_before3', 'landing_ba_before4', 'landing_ba_before5'];

  protected readonly afterItems = ['landing_ba_after1', 'landing_ba_after2', 'landing_ba_after3', 'landing_ba_after4', 'landing_ba_after5'];
}
