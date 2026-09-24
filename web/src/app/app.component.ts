import { Component, inject } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet
} from '@angular/router';

// ლოადერს ყოველთვის (პირველ ჩატვირთვაზეც და შემდგომ ნავიგაციებზეც) მინიმუმ ამდენ ხანს
// ვაჩვენებთ, თუნდაც resolver/chunk მყისვე ჩაიტვირთოს — წინააღმდეგ შემთხვევაში checkit-ის
// ანიმაცია უბრალოდ არ ესწრება.
const MIN_LOADER_MS = 2000;
// შემდგომ ნავიგაციებზე (მაგ. landing → /hotel/:slug) loader-ს ვაჩვენებთ მხოლოდ თუ
// resolver/lazy-chunk ამდენ ხანს მაინც გაგრძელდა — სწრაფ (უკვე preload-ილ) გადასვლებზე
// ხტუნვას ვაცილებთ.
const NAV_LOADER_SHOW_DELAY_MS = 150;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {
    const router = inject(Router);
    const loader = document.getElementById('initial-loader');
    if (!loader) return;

    let isFirstNav = true;
    let showTimer: ReturnType<typeof setTimeout> | undefined;
    let shownAt = 0;

    const hideLoader = () => {
      clearTimeout(showTimer);
      const remaining = shownAt ? Math.max(0, MIN_LOADER_MS - (Date.now() - shownAt)) : 0;
      shownAt = 0;
      setTimeout(() => loader.classList.add('done'), remaining);
    };

    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // პირველი ნავიგაცია (index.html-ის სტატიკური loader-ის მოშორების მომენტი) ცალკე
        // იმართება NavigationEnd-ში, MIN_LOADER_MS-ის დაცვით — აქ არაფერი ვქნათ.
        if (isFirstNav) return;

        showTimer = setTimeout(() => {
          loader.classList.remove('done');
          shownAt = Date.now();
        }, NAV_LOADER_SHOW_DELAY_MS);
        return;
      }

      if (event instanceof NavigationEnd && isFirstNav) {
        isFirstNav = false;
        // resolver-ები + lazy chunk-ები უკვე ჩატვირთულია ამ მომენტისთვის.
        const elapsed = Date.now() - performance.timeOrigin;
        const remaining = Math.max(0, MIN_LOADER_MS - elapsed);

        setTimeout(() => {
          loader.classList.add('done');
          // hero/topbar-ის load-in ანიმაციები (animation-play-state: paused საწყისად, იხ.
          // hero-section.component.scss/landing.component.scss) ამ კლასის დამატებამდე
          // დაპაუზებულია — თორემ DOM-ში ჩასმისთანავე დაიწყებოდნენ და loader-ის მიღმა,
          // უხილავად, უკვე დამთავრებული აღმოჩნდებოდნენ ამ setTimeout-მდე.
          document.documentElement.classList.add('app-revealed');
        }, remaining);
        return;
      }

      if (
        !isFirstNav &&
        (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError)
      ) {
        hideLoader();
      }
    });
  }
}
