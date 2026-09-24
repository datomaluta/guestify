import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';

interface HowStep {
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-how-section',
  standalone: true,
  imports: [TranslatePipe, IconComponent],
  templateUrl: './how-section.component.html',
  styleUrl: './how-section.component.scss'
})
export class HowSectionComponent {
  protected readonly steps: HowStep[] = [
    { icon: 'edit_note', titleKey: 'landing_how1_title', descKey: 'landing_how1_desc' },
    { icon: 'qr_code_2', titleKey: 'landing_how2_title', descKey: 'landing_how2_desc' },
    { icon: 'smartphone', titleKey: 'landing_how3_title', descKey: 'landing_how3_desc' }
  ];
}
