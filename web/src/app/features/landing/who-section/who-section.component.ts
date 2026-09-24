import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';

interface WhoCard {
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-who-section',
  standalone: true,
  imports: [TranslatePipe, IconComponent],
  templateUrl: './who-section.component.html',
  styleUrl: './who-section.component.scss'
})
export class WhoSectionComponent {
  protected readonly cards: WhoCard[] = [
    { icon: 'home', titleKey: 'landing_who1_title', descKey: 'landing_who1_desc' },
    { icon: 'cottage', titleKey: 'landing_who2_title', descKey: 'landing_who2_desc' },
    { icon: 'beach_access', titleKey: 'landing_who3_title', descKey: 'landing_who3_desc' },
    { icon: 'work', titleKey: 'landing_who4_title', descKey: 'landing_who4_desc' },
    { icon: 'domain', titleKey: 'landing_who5_title', descKey: 'landing_who5_desc' }
  ];
}
