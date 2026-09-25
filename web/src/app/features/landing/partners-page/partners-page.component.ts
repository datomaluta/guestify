import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';
import { LangDropdownComponent } from '../../../shared/lang-dropdown/lang-dropdown.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { PartnerCardComponent } from '../../../shared/partner-card/partner-card.component';
import { PARTNER_HOTELS } from '../partners-section/partners.data';

/**
 * ყველა პარტნიორი სასტუმროს სრული სია (root `/partners`) — ლენდინგის Partners სექციის
 * "ყველას ნახვა" ღილაკიდან. ცალკე მსუბუქი გვერდია, საკუთარი მინი-header/footer-ით
 * (და არა LandingComponent-ის სრული სქროლ-ნავიგაცია, რომელიც ამ გვერდზე უადგილო იქნებოდა).
 */
@Component({
  selector: 'app-partners-page',
  standalone: true,
  imports: [TranslatePipe, IconComponent, LangDropdownComponent, RouterLink, RevealDirective, PartnerCardComponent],
  templateUrl: './partners-page.component.html',
  styleUrl: './partners-page.component.scss'
})
export class PartnersPageComponent {
  protected readonly partners = PARTNER_HOTELS;
}
