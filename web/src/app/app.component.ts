import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, take } from 'rxjs';

// ლოადერს მინიმუმ ამდენ ხანს ვაჩვენებთ, თუნდაც საიტი სწრაფ ინტერნეტზე მყისვე ჩაიტვირთოს —
// წინააღმდეგ შემთხვევაში checkit-ის ანიმაცია უბრალოდ არ ესწრება.
const MIN_LOADER_MS = 2000;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {
    const router = inject(Router);
    // პირველი დასრულებული ნავიგაცია (resolver-ები + lazy chunk-ები უკვე ჩატვირთული) — index.html-ის სტატიკური loader-ის მოშორების მომენტი.
    router.events.pipe(filter((e) => e instanceof NavigationEnd), take(1)).subscribe(() => {
      const loader = document.getElementById('initial-loader');
      if (!loader) return;

      const elapsed = Date.now() - performance.timeOrigin;
      const remaining = Math.max(0, MIN_LOADER_MS - elapsed);

      setTimeout(() => {
        loader.classList.add('done');
        // hero/topbar-ის load-in ანიმაციები (animation-play-state: paused საწყისად, იხ.
        // hero-section.component.scss/landing.component.scss) ამ კლასის დამატებამდე
        // დაპაუზებულია — თორემ DOM-ში ჩასმისთანავე დაიწყებოდნენ და loader-ის მიღმა,
        // უხილავად, უკვე დამთავრებული აღმოჩნდებოდნენ ამ setTimeout-მდე.
        document.documentElement.classList.add('app-revealed');
        setTimeout(() => loader.remove(), 300);
      }, remaining);
    });
  }
}
