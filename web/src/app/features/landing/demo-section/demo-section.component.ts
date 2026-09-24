import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface DemoPill {
  icon: string;
  key: string;
  active?: boolean;
}

@Component({
  selector: 'app-demo-section',
  standalone: true,
  imports: [TranslatePipe, IconComponent, RouterLink, RevealDirective],
  templateUrl: './demo-section.component.html',
  styleUrl: './demo-section.component.scss'
})
export class DemoSectionComponent {
  protected readonly pills: DemoPill[] = [
    { icon: 'wifi', key: 'landing_demo_pill_wifi', active: true },
    { icon: 'login', key: 'landing_demo_pill_checkin' },
    { icon: 'gavel', key: 'landing_demo_pill_rules' },
    { icon: 'tips_and_updates', key: 'landing_demo_pill_tips' },
    { icon: 'emergency', key: 'landing_demo_pill_emergency' },
    { icon: 'auto_awesome', key: 'landing_demo_pill_ai' }
  ];
}
