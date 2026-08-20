import { Component, input } from '@angular/core';

/**
 * Google Material Symbols (Outlined) — ligature-based icon font.
 * `name` შეიძლება იყოს ნებისმიერი ვალიდური Material Symbols სახელი
 * (იძებნება fonts.google.com/icons-ზე, სახელს პირდაპირ ვწერთ, არაფრის ჩამოტვირთვა არ სჭირდება) —
 * აღარაა შეზღუდული ჩვენს მიერ წინასწარ დამატებულ curated ნაკრებზე.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `<span class="material-symbols-outlined" [style.font-size.px]="size()">{{ name() }}</span>`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }
  `
})
export class IconComponent {
  readonly name = input.required<string>();
  /** პიქსელებში — Material Symbols-ის glyph-ი ამ ზომაზე იხატება (font-size განსაზღვრავს, არა width/height). */
  readonly size = input<number>(20);
}
