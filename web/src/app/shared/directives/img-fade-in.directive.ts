import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appFadeIn]',
  standalone: true,
})
export class ImgFadeInDirective {
  @HostBinding('class.is-loaded') loaded = false;

  @HostListener('load')
  onLoad(): void {
    this.loaded = true;
  }
}
