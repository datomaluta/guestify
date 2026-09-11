import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HotelContextService } from '../../../core/services/hotel-context.service';
import { IconComponent } from '../../../shared/icon/icon.component';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

interface BottomNavTab {
  /** guest-shell-ის child route-ის path (app.routes.ts-ში) — ცარიელი სტრიქონი Home-ისთვის. */
  path: string;
  icon: string;
  labelKey: string;
  /** მხოლოდ Home-ს სჭირდება — routerLinkActive-მა სხვა ტაბებთან რომ არ დაემთხვეს ცარიელი path-ის გამო. */
  exact?: boolean;
}

/** Home ორივე პაკეტში შუაშია — 5 ტაბიდან მე-3, 3-დან მე-2 (იხ. გუნდის განხილვა). */
const PREMIUM_TABS: BottomNavTab[] = [
  { path: '', icon: 'home', labelKey: 'bottomnav_home', exact: true },
  { path: 'guide', icon: 'explore', labelKey: 'bottomnav_explore' },
  { path: 'ai', icon: 'auto_awesome', labelKey: 'bottomnav_ai' },
  { path: 'essentials', icon: 'grid_view', labelKey: 'bottomnav_essentials' },
  { path: 'menu', icon: 'restaurant', labelKey: 'bottomnav_restaurant' },
];

const STANDARD_TABS: BottomNavTab[] = [
  { path: 'guide', icon: 'explore', labelKey: 'bottomnav_explore' },
  { path: '', icon: 'home', labelKey: 'bottomnav_home', exact: true },
  { path: 'essentials', icon: 'grid_view', labelKey: 'bottomnav_essentials' },
];

/**
 * სტუმრის აპის ქვედა ნავიგაცია. ტაბების ნაკრები დამოკიდებულია hotel.package-ზე —
 * standard სასტუმროზე premium-ის ტაბები (AI, Restaurant) საერთოდ არ ჩანს
 * (არა disabled/locked — გუნდურად გადავწყვიტეთ, რომ ასე ცუდ შთაბეჭდილებას არ ტოვებდეს).
 *
 * ჯერჯერობით ჩონჩხია: ტაბები/routing/active-state მუშაობს, კონტენტი (Essentials-ის
 * შემადგენლობა, Host-ის ინფო, AI) მომდევნო ეტაპებზე მოემატება.
 */
@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent, TranslatePipe],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss',
})
export class BottomNavComponent {
  private readonly hotelContext = inject(HotelContextService);

  protected readonly tabs = computed<BottomNavTab[]>(() =>
    this.hotelContext.isPremium() ? PREMIUM_TABS : STANDARD_TABS,
  );

  /**
   * აბსოლუტური path (/hotel/slug/...) — განზრახ არა [routerLink]="tab.path" ფარდობითად,
   * რადგან ეს კომპონენტი router-outlet-ის გარეთაა (guest-shell-ის template-შია პირდაპირ, არა
   * route-ით ჩატვირთული), და routerLink="" ცარიელი commands-ით ("home") root ('/')-ზე,
   * ანუ ლენდინგზე გადაგვისვრიდა relativeTo-ის ბუნდოვანების გამო.
   */
  protected tabHref(tab: BottomNavTab): string {
    const slug = this.hotelContext.hotel()?.slug;
    const base = slug ? `/hotel/${slug}` : '/';
    return tab.path ? `${base}/${tab.path}` : base;
  }
}
