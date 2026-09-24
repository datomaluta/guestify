import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { IconComponent } from '../../../shared/icon/icon.component';

/**
 * ლენდინგის hero სექცია — header-თან ერთად ავსებს პირველ ეკრანს (იხ. landing.component.scss-ის
 * .hero-screen). :host { display: contents } განზრახაა — .hero-screen-ის flex-განლაგებაში
 * თავად .hero ელემენტი (და არა ეს custom element) უნდა იყოს ჩაშენებული flex item.
 */
@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [TranslatePipe, IconComponent, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent {}
