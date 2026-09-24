import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * ელემენტს viewport-ში პირველად შესვლისას ამატებს .is-visible კლასს (IntersectionObserver-ით,
 * ერთხელ, მერე თავს იშლის) — scroll-reveal ეფექტისთვის. საწყისი/საბოლოო ვიზუალური მდგომარეობა
 * (opacity/translate/scale) გლობალურ styles.scss-შია განსაზღვრული ([appReveal] სელექტორით),
 * ეს directive მხოლოდ კლასის დროულად დამატებას აკეთებს.
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement;
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.el.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.classList.add('is-visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    this.observer.observe(this.el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
