import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { SelectivePreloadStrategy } from './core/services/selective-preload.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withPreloading(SelectivePreloadStrategy),
      // ბრაუზერის ნატიური View Transitions API-ს ჩართავს ნავიგაციაზე — @angular/animations
      // პაკეტის გარეშე, სუფთა CSS keyframes-ით (იხ. styles.scss, ::view-transition-*(guest-page)).
      // skipInitialTransition: აპის პირველივე ჩატვირთვაზე გადასვლის ანიმაცია არ სჭირდება.
      withViewTransitions({ skipInitialTransition: true })
    )
  ]
};
