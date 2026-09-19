import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { SelectivePreloadStrategy } from './core/services/selective-preload.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(SelectivePreloadStrategy))
    // (View Transitions API-ს withViewTransitions() ვცადეთ guest ტაბებს შორის
    // ნავიგაციის ანიმაციისთვის — მოხსნილია: `view-transition-name`-ს spec-ის
    // მიხედვით მუდმივი stacking-context-ის გვერდითი ეფექტი აქვს, რაც სამჯერ
    // დაარღვია რეალური ლეიაუტი (bottom-nav flicker, header/lang-dropdown-ის
    // stacking, menu-item-sheet-ის overlay ვეღარ ეფარებოდა header-ს) — ნავიგაციაზე
    // NavigationStart/End router-ის ივენთები კიდეც ბრაუზერის startViewTransition()
    // callback-ის *შიგნით* ეშვება, ამიტომ router-ივენთებზე დამოკიდებული toggle-იც
    // ვერასდროს ხვდებოდა სწორ დროს. ამის ნაცვლად: guest-shell.component.ts-ში
    // მარტივი CSS class-toggle crossfade (.leaving/.entering), router.events-ზე
    // დამოკიდებული, browser-ის snapshot-მექანიზმის გვერდის ავლით.)
  ]
};
