import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { Partner } from '../../../core/models';
import { PartnersService } from '../../../core/services/partners.service';
import { IconComponent } from '../../../shared/icon/icon.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { PartnerCardComponent } from '../../../shared/partner-card/partner-card.component';

/** სია admin-ში იმართება (Supabase `partners`, 0021) — აქ მხოლოდ `featured`-ები ჩანს.
 * სანამ სია არ ჩამოვა (ან ცარიელია/შეცდომაა), სექცია საერთოდ არ იხატება. */
@Component({
  selector: 'app-partners-section',
  standalone: true,
  imports: [TranslatePipe, IconComponent, RevealDirective, RouterLink, PartnerCardComponent],
  templateUrl: './partners-section.component.html',
  styleUrl: './partners-section.component.scss'
})
export class PartnersSectionComponent {
  protected readonly featuredPartners = signal<Partner[]>([]);

  constructor() {
    inject(PartnersService)
      .listActive()
      .then((partners) => this.featuredPartners.set(partners.filter((p) => p.featured)))
      .catch(() => this.featuredPartners.set([]));
  }
}
