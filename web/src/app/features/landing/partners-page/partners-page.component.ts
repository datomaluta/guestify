import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { Partner } from '../../../core/models';
import { PartnersService } from '../../../core/services/partners.service';
import { IconComponent } from '../../../shared/icon/icon.component';
import { LangDropdownComponent } from '../../../shared/lang-dropdown/lang-dropdown.component';
import { PartnerCardComponent } from '../../../shared/partner-card/partner-card.component';

/**
 * ყველა პარტნიორი სასტუმროს სრული სია (root `/partners`) — ლენდინგის Partners სექციის
 * "ყველას ნახვა" ღილაკიდან. ცალკე მსუბუქი გვერდია, საკუთარი მინი-header/footer-ით
 * (და არა LandingComponent-ის სრული სქროლ-ნავიგაცია, რომელიც ამ გვერდზე უადგილო იქნებოდა).
 */
@Component({
  selector: 'app-partners-page',
  standalone: true,
  imports: [TranslatePipe, IconComponent, LangDropdownComponent, RouterLink, PartnerCardComponent],
  templateUrl: './partners-page.component.html',
  styleUrl: './partners-page.component.scss'
})
export class PartnersPageComponent {
  protected readonly partners = signal<Partner[]>([]);
  protected readonly loading = signal(true);
  /** ჩატვირთვისას skeleton ქარდების რაოდენობა — layout რომ არ ახტეს. */
  protected readonly skeletons = [0, 1, 2];

  constructor() {
    inject(PartnersService)
      .listActive()
      .then((partners) => this.partners.set(partners))
      .catch(() => this.partners.set([]))
      .finally(() => this.loading.set(false));
  }
}
