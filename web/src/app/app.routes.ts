import { Routes } from '@angular/router';
import { hotelResolver } from './core/services/hotel.resolver';
import { authGuard } from './core/services/auth.guard';
import { superadminGuard } from './core/services/superadmin.guard';

export const routes: Routes = [
  {
    path: 'hotel/:slug',
    loadComponent: () =>
      import('./features/guest/guest-shell/guest-shell.component').then((m) => m.GuestShellComponent),
    resolve: { hotel: hotelResolver },
    children: [
      {
        path: '',
        loadComponent: () => import('./features/guest/home/home.component').then((m) => m.HomeComponent)
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./features/guest/services/services.component').then((m) => m.ServicesComponent)
      },
      {
        path: 'menu',
        loadComponent: () => import('./features/guest/menu/menu.component').then((m) => m.MenuComponent)
      },
      {
        path: 'guide',
        loadComponent: () => import('./features/guest/guide/guide.component').then((m) => m.GuideComponent)
      },
      {
        path: 'rules',
        loadComponent: () => import('./features/guest/rules/rules.component').then((m) => m.RulesComponent)
      }
    ]
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/admin-login/admin-login.component').then((m) => m.AdminLoginComponent)
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/admin-shell/admin-shell.component').then((m) => m.AdminShellComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/admin/admin-home/admin-home.component').then((m) => m.AdminHomeComponent)
      },
      {
        path: 'hotels',
        canActivate: [superadminGuard],
        loadComponent: () =>
          import('./features/admin/hotels/hotel-list/hotel-list.component').then((m) => m.HotelListComponent)
      },
      {
        path: 'hotels/:id',
        canActivate: [superadminGuard],
        loadComponent: () =>
          import('./features/admin/hotels/hotel-form/hotel-form.component').then((m) => m.HotelFormComponent)
      }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'admin/login' },
  { path: '**', redirectTo: 'admin/login' }
];
