import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/icon/icon.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LocalizePipe } from '../../../core/i18n/localize.pipe';
import { HotelContextService } from '../../../core/services/hotel-context.service';

interface NavCard {
  route: string;
  icon: string;
  titleKey: string;
  descKey: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, IconComponent, TranslatePipe, LocalizePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  protected readonly hotelContext = inject(HotelContextService);

  protected readonly cards: NavCard[] = [
    { route: 'services', icon: 'room_service', titleKey: 'nav_services', descKey: 'nav_services_desc' },
    { route: 'menu', icon: 'restaurant', titleKey: 'nav_menu', descKey: 'nav_menu_desc' },
    { route: 'guide', icon: 'location_on', titleKey: 'nav_guide', descKey: 'nav_guide_desc' },
    { route: 'rules', icon: 'rule', titleKey: 'nav_rules', descKey: 'nav_rules_desc' }
  ];
}
