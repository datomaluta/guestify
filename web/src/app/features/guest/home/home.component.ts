import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent, IconName } from '../../../shared/icon/icon.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

interface NavCard {
  route: string;
  icon: IconName;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, IconComponent, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly cards: NavCard[] = [
    { route: 'services', icon: 'concierge-bell', titleKey: 'nav_services', descKey: 'nav_services_desc' },
    { route: 'menu', icon: 'cutlery', titleKey: 'nav_menu', descKey: 'nav_menu_desc' },
    { route: 'guide', icon: 'map-pin', titleKey: 'nav_guide', descKey: 'nav_guide_desc' },
    { route: 'rules', icon: 'shield-check', titleKey: 'nav_rules', descKey: 'nav_rules_desc' }
  ];
}
