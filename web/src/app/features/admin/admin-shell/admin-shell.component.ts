import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/theme.service';
import { IconComponent } from '../../../shared/icon/icon.component';

@Component({
  selector: 'app-admin-shell',
  standalone: true,
  imports: [RouterLink, RouterOutlet, IconComponent],
  templateUrl: './admin-shell.component.html',
  styleUrl: './admin-shell.component.scss'
})
export class AdminShellComponent {
  protected readonly auth = inject(AuthService);
  protected readonly theme = inject(ThemeService);
  private readonly router = inject(Router);

  async signOut(): Promise<void> {
    await this.auth.signOut();
    this.router.navigateByUrl('/admin/login');
  }
}
