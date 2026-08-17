import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

/**
 * დროებითი placeholder. აქ დაემატება: hotels CRUD (superadmin), საკუთარი
 * hotel-ის content რედაქტორები (hotel_admin) — services/menu/guide/rules/contacts.
 */
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `
    <div class="wrap">
      <p>Signed in as <b>{{ auth.profile()?.role }}</b></p>
      <button type="button" (click)="signOut()">Sign out</button>
    </div>
  `,
  styles: `
    .wrap {
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      align-items: flex-start;
    }
    button {
      padding: 8px 16px;
      border-radius: 8px;
      border: 1px solid var(--line);
      background: var(--paper-sunk);
      cursor: pointer;
    }
  `
})
export class AdminDashboardComponent {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  async signOut(): Promise<void> {
    await this.auth.signOut();
    this.router.navigateByUrl('/admin/login');
  }
}
