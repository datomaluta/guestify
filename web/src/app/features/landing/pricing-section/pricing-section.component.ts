import { Component } from '@angular/core';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

interface PricingPlan {
  nameKey: string;
  price: string;
  featureKeys: string[];
  ctaKey: string;
  ctaIcon: string | null;
  highlighted: boolean;
}

const PRICING_TEL = 'tel:+995577776841';

@Component({
  selector: 'app-pricing-section',
  standalone: true,
  imports: [TranslatePipe, IconComponent, RevealDirective],
  templateUrl: './pricing-section.component.html',
  styleUrl: './pricing-section.component.scss'
})
export class PricingSectionComponent {
  protected readonly tel = PRICING_TEL;

  protected readonly plans: PricingPlan[] = [
    {
      nameKey: 'landing_pricing_standard_name',
      price: '₾50',
      featureKeys: [
        'landing_pricing_standard_f1',
        'landing_pricing_standard_f2',
        'landing_pricing_standard_f3',
        'landing_pricing_standard_f4',
        'landing_pricing_standard_f5'
      ],
      ctaKey: 'landing_pricing_standard_cta',
      ctaIcon: 'call',
      highlighted: false
    },
    {
      nameKey: 'landing_pricing_premium_name',
      price: '₾100',
      featureKeys: [
        'landing_pricing_premium_f1',
        'landing_pricing_premium_f2',
        'landing_pricing_premium_f3',
        'landing_pricing_premium_f4'
      ],
      ctaKey: 'landing_pricing_premium_cta',
      ctaIcon: null,
      highlighted: true
    }
  ];
}
