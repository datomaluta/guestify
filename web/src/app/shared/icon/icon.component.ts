import { Component, input } from '@angular/core';

export type IconName =
  // ზოგადი / ნავიგაცია
  | 'concierge-bell'
  | 'cutlery'
  | 'map-pin'
  | 'shield-check'
  | 'chevron-left'
  | 'chevron-right'
  | 'external-link'
  | 'phone'
  | 'general'
  // სერვისების curated ნაკრები
  | 'cup'
  | 'droplet'
  | 'clock'
  | 'wifi'
  | 'parking'
  | 'pool'
  | 'gym'
  | 'laundry'
  | 'pets'
  | 'elevator'
  | 'bar'
  | 'ac'
  | 'tv'
  | 'safe'
  | 'minibar'
  | 'shuttle'
  | 'beach'
  | 'kids-club'
  | 'non-smoking'
  | 'luggage'
  | 'bike'
  | 'business-center'
  | 'accessibility';

/** მსუბუქი ხაზოვანი icon-ების ნაკრები — ერთი კომპონენტი, ყველგან იგივე სტილი (stroke, currentColor). */
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
      @case ('general') {
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2c.7 3.8 2.9 6 6.7 6.7-3.8.7-6 2.9-6.7 6.7-.7-3.8-2.9-6-6.7-6.7C9.1 8 11.3 5.8 12 2z"/><path d="M18.5 15c.4 1.9 1.4 2.9 3.3 3.3-1.9.4-2.9 1.4-3.3 3.3-.4-1.9-1.4-2.9-3.3-3.3 1.9-.4 2.9-1.4 3.3-3.3z"/></svg>
      }
      @case ('parking') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M9.5 16V8h2.8a2.4 2.4 0 0 1 0 4.8H9.5"/></svg>
      }
      @case ('pool') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="17" cy="6" r="2"/><path d="M3 14c1.5-1.2 3-1.2 4.5 0s3 1.2 4.5 0 3-1.2 4.5 0 3 1.2 4.5 0"/><path d="M3 18.5c1.5-1.2 3-1.2 4.5 0s3 1.2 4.5 0 3-1.2 4.5 0 3 1.2 4.5 0"/></svg>
      }
      @case ('gym') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 12h11"/><rect x="2" y="9" width="3" height="6" rx="1"/><rect x="19" y="9" width="3" height="6" rx="1"/><rect x="5.5" y="10" width="2" height="4" rx=".5"/><rect x="16.5" y="10" width="2" height="4" rx=".5"/></svg>
      }
      @case ('laundry') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="13.5" r="4.5"/><path d="M9.3 13.5a2.7 2.7 0 0 1 2.7-2.7"/><circle cx="7.3" cy="6" r=".7" fill="currentColor" stroke="none"/><circle cx="10" cy="6" r=".7" fill="currentColor" stroke="none"/></svg>
      }
      @case ('pets') {
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><circle cx="12" cy="15.2" r="3.4"/><circle cx="6.6" cy="9.2" r="1.8"/><circle cx="17.4" cy="9.2" r="1.8"/><circle cx="9.4" cy="5.6" r="1.6"/><circle cx="14.6" cy="5.6" r="1.6"/></svg>
      }
      @case ('elevator') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M10 9.5 12 7.3l2 2.2"/><path d="M10 14.5 12 16.7l2-2.2"/></svg>
      }
      @case ('bar') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h14l-7 8v7"/><path d="M9 19h6"/><path d="M6.5 6.5h11"/></svg>
      }
      @case ('ac') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M4.8 7.5l14.4 9M19.2 7.5 4.8 16.5"/></svg>
      }
      @case ('tv') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8"/><path d="M9 5l3-3 3 3"/></svg>
      }
      @case ('safe') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="3.4"/><path d="M12 12v-2.2"/></svg>
      }
      @case ('minibar') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M6 9.5h12"/><path d="M9 4.5v2M9 12v2"/></svg>
      }
      @case ('shuttle') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8.5h14a1.5 1.5 0 0 1 1.5 1.5v6h-15.5z"/><path d="M18 11h2l1.5 2.2V16H18z"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="17" cy="17.5" r="1.6"/></svg>
      }
      @case ('beach') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c4.4 0 8 3.8 8.5 8H3.5C4 6.8 7.6 3 12 3z"/><path d="M12 3v18"/><path d="M9 21c0-1 1.3-1.6 3-1.6s3 .6 3 1.6"/></svg>
      }
      @case ('kids-club') {
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2.5l2.2 4.9 5.3.6-4 3.6 1.1 5.2L12 14l-4.6 2.8 1.1-5.2-4-3.6 5.3-.6L12 2.5z"/></svg>
      }
      @case ('non-smoking') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 15.5h11"/><path d="M16.5 12.7c1 1 1 2.6 0 3.6M18.5 10.7c1.7 1.7 1.7 4.4 0 6.1"/><path d="M4 4l16 16"/></svg>
      }
      @case ('luggage') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M4 13.5h16"/></svg>
      }
      @case ('bike') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l4-8h4l3 8"/><path d="M10 9h4"/></svg>
      }
      @case ('business-center') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="11" rx="2"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 13.5h18"/></svg>
      }
      @case ('accessibility') {
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="15.5" cy="5" r="1.7"/><path d="M10.5 8h5l1 5h4.5"/><path d="M12 8v4l4.5 2"/><circle cx="9.5" cy="17" r="4"/></svg>
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

/** ყველა ცნობილი icon-სახელი — გამოსადეგია სხვა კომპონენტში მოსული (ბაზიდან წამოსული) icon string-ის ვალიდაციისთვის. */
export const ICON_NAMES: IconName[] = [
  'concierge-bell',
  'cutlery',
  'map-pin',
  'shield-check',
  'chevron-left',
  'chevron-right',
  'external-link',
  'phone',
  'general',
  'cup',
  'droplet',
  'clock',
  'wifi',
  'parking',
  'pool',
  'gym',
  'laundry',
  'pets',
  'elevator',
  'bar',
  'ac',
  'tv',
  'safe',
  'minibar',
  'shuttle',
  'beach',
  'kids-club',
  'non-smoking',
  'luggage',
  'bike',
  'business-center',
  'accessibility'
];
