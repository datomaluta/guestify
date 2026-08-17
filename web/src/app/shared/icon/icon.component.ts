import { Component, input } from '@angular/core';

export type IconName =
  | 'concierge-bell'
  | 'cutlery'
  | 'map-pin'
  | 'shield-check'
  | 'cup'
  | 'droplet'
  | 'clock'
  | 'wifi'
  | 'chevron-left'
  | 'chevron-right'
  | 'external-link'
  | 'phone';

/** მსუბუქი ხაზოვანი icon-ების ნაკრები — ერთი კომპონენტი, ყველგან იგივე სტილი. */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    @switch (name()) {
      @case ('concierge-bell') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a5 5 0 0 0-5 5v3.2c0 .8-.3 1.5-.9 2.1L5 15h14l-1.1-1.7c-.6-.6-.9-1.3-.9-2.1V8a5 5 0 0 0-5-5z"/><path d="M9.5 18a2.5 2.5 0 0 0 5 0"/></svg>
      }
      @case ('cutlery') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3v6a2 2 0 0 0 2 2v10M7 3v4M9.4 3v4M11.8 3v4M16.8 3c-1.8 0-3 1.9-3 4.5S15 12 16.8 12V21"/></svg>
      }
      @case ('map-pin') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-7.4 7-12.2A7 7 0 1 0 5 8.8C5 13.6 12 21 12 21z"/><circle cx="12" cy="8.6" r="2.4"/></svg>
      }
      @case ('shield-check') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2 5 6v6c0 5 3 7.8 7 8.8 4-1 7-3.8 7-8.8V6l-7-2.8z"/><path d="m9 12 2 2 4-4.2"/></svg>
      }
      @case ('cup') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8z"/><path d="M17 9.5h1.5a2 2 0 0 1 0 4H17"/></svg>
      }
      @case ('droplet') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s5.5 6.3 5.5 10.2a5.5 5.5 0 1 1-11 0C6.5 9.3 12 3 12 3z"/></svg>
      }
      @case ('clock') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.2"/><path d="M12 7.5V12l3 2"/></svg>
      }
      @case ('wifi') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.8a10.7 10.7 0 0 1 15 0M7.3 15.8a6.7 6.7 0 0 1 9.4 0M10.2 18.7a2.8 2.8 0 0 1 3.6 0"/><circle cx="12" cy="20.6" r=".6" fill="currentColor" stroke="none"/></svg>
      }
      @case ('chevron-left') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>
      }
      @case ('chevron-right') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>
      }
      @case ('external-link') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></svg>
      }
      @case ('phone') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3 10.6 10.6 0 0 0 3.3.5 1.2 1.2 0 0 1 1.1 1.2V20a1.2 1.2 0 0 1-1.2 1.2A16.8 16.8 0 0 1 2.8 4.2 1.2 1.2 0 0 1 4 3h3.4a1.2 1.2 0 0 1 1.2 1.1c.1 1.1.3 2.2.5 3.3a1.2 1.2 0 0 1-.3 1.2z"/></svg>
      }
    }
  `,
  styles: `
    :host { display: inline-flex; width: 100%; height: 100%; }
    svg { width: 100%; height: 100%; }
  `
})
export class IconComponent {
  readonly name = input.required<IconName>();
}
