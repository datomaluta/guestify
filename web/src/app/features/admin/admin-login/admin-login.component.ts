import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected email = '';
  protected password = '';
  protected readonly submitting = signal(false);
  protected readonly error = signal(false);

  async submit(): Promise<void> {
    this.submitting.set(true);
    this.error.set(false);

    const { error } = await this.auth.signIn(this.email, this.password);

    this.submitting.set(false);

    if (error) {
      this.error.set(true);
      return;
    }

    this.router.navigateByUrl('/admin');
  }
}
