import { Injectable, signal } from '@angular/core';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'guestify_theme';

/**
 * თემის მართვა სამ მდგომარეობად: სისტემური (default, data-theme არ ესმევა DOM-ს),
 * ან სტუმრის ხელით არჩეული light/dark (persist localStorage-ში, root-ზე stamp-დება).
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.effectiveTheme());

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved === 'light' || saved === 'dark') {
      this.apply(saved);
    }
  }

  toggle(): void {
    const next: Theme = this.effectiveTheme() === 'dark' ? 'light' : 'dark';
    this.apply(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  private apply(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
    this.theme.set(theme);
  }

  private effectiveTheme(): Theme {
    const stamped = document.documentElement.getAttribute('data-theme');
    if (stamped === 'light' || stamped === 'dark') return stamped;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
