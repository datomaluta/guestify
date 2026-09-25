import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { PartnerCardComponent } from '../../../shared/partner-card/partner-card.component';
import { PARTNER_HOTELS } from './partners.data';

@Component({
  selector: 'app-partners-section',
  standalone: true,
  imports: [TranslatePipe, IconComponent, RevealDirective, RouterLink, PartnerCardComponent],
  templateUrl: './partners-section.component.html',
  styleUrl: './partners-section.component.scss'
})
export class PartnersSectionComponent {
  protected readonly featuredPartners = PARTNER_HOTELS.filter((p) => p.featured);
}
