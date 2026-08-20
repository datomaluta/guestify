import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../icon/icon.component';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

/** სათაური + "უკან" ღილაკი — services/menu/guide/rules გვერდების საერთო header. */
@Component({
  selector: 'app-sub-header',
  standalone: true,
  imports: [RouterLink, IconComponent, TranslatePipe],
  template: `
    <div class="sub-header">
      <a routerLink="../" class="back-btn" [attr.aria-label]="'back' | translate">
        <app-icon name="chevron_left" [size]="16" />
      </a>
      <h1>{{ titleKey() | translate }}</h1>
    </div>
  `,
  styles: `
    .sub-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px 18px;
      border-bottom: 1px solid var(--line-soft);
      position: sticky;
      top: 0;
      z-index: 5;
      background: var(--paper);

      @media (min-width: 720px) {
        padding: 18px 32px;
      }
    }

    .back-btn {
      width: 30px;
      height: 30px;
      padding: 7px;
      border-radius: 8px;
      border: 1px solid var(--line);
      background: var(--paper-raised);
      color: var(--ink);
      display: grid;
      place-items: center;
      text-decoration: none;
      flex-shrink: 0;
      transition: border-color 0.15s ease, color 0.15s ease;
    }

    .back-btn:hover {
      border-color: var(--brand-primary);
      color: var(--brand-primary);
    }

    h1 {
      font-size: 16px;
      font-weight: 700;
      margin: 0;
    }
  `
})
export class SubHeaderComponent {
  readonly titleKey = input.required<string>();
}
