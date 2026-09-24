import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';

interface LandingFeature {
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [TranslatePipe, IconComponent],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.scss'
})
export class FeaturesSectionComponent {
  protected readonly features: LandingFeature[] = [
    { icon: 'wifi', titleKey: 'landing_features1_title', descKey: 'landing_features1_desc' },
    { icon: 'login', titleKey: 'landing_features2_title', descKey: 'landing_features2_desc' },
    { icon: 'gavel', titleKey: 'landing_features3_title', descKey: 'landing_features3_desc' },
    { icon: 'explore', titleKey: 'landing_features4_title', descKey: 'landing_features4_desc' },
    { icon: 'call', titleKey: 'landing_features5_title', descKey: 'landing_features5_desc' },
    { icon: 'health_and_safety', titleKey: 'landing_features6_title', descKey: 'landing_features6_desc' },
    { icon: 'auto_awesome', titleKey: 'landing_features7_title', descKey: 'landing_features7_desc' },
    { icon: 'language', titleKey: 'landing_features8_title', descKey: 'landing_features8_desc' },
    { icon: 'edit_note', titleKey: 'landing_features9_title', descKey: 'landing_features9_desc' },
    { icon: 'qr_code_2', titleKey: 'landing_features10_title', descKey: 'landing_features10_desc' }
  ];
}
