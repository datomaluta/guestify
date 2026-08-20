import { Routes } from '@angular/router';
import { hotelResolver } from './core/services/hotel.resolver';
import { authGuard } from './core/services/auth.guard';
import { superadminGuard } from './core/services/superadmin.guard';
import { hotelAdminGuard } from './core/services/hotel-admin.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/landing/landing.component').then((m) => m.LandingComponent)
  },
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
          import('./features/guest/services/services.component').then((m) => m.ServicesComponent),
        data: { preload: true }
      },
      {
        path: 'menu',
        loadComponent: () => import('./features/guest/menu/menu.component').then((m) => m.MenuComponent),
        data: { preload: true }
      },
      {
        path: 'guide',
        loadComponent: () => import('./features/guest/guide/guide.component').then((m) => m.GuideComponent),
        data: { preload: true }
      },
      {
        path: 'rules',
        loadComponent: () => import('./features/guest/rules/rules.component').then((m) => m.RulesComponent),
        data: { preload: true }
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
      },
      {
        path: 'content',
        canActivate: [hotelAdminGuard],
        loadComponent: () =>
          import('./features/admin/content/content-shell/content-shell.component').then((m) => m.ContentShellComponent),
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'services' },
          {
            path: 'services',
            loadComponent: () =>
              import('./features/admin/content/services-editor/services-editor.component').then(
                (m) => m.ServicesEditorComponent
              )
          },
          {
            path: 'menu',
            loadComponent: () =>
              import('./features/admin/content/menu-editor/menu-editor.component').then((m) => m.MenuEditorComponent)
          },
          {
            path: 'guide',
            loadComponent: () =>
              import('./features/admin/content/guide-editor/guide-editor.component').then((m) => m.GuideEditorComponent)
          },
          {
            path: 'rules',
            loadComponent: () =>
              import('./features/admin/content/rules-editor/rules-editor.component').then((m) => m.RulesEditorComponent)
          },
          {
            path: 'contacts',
            loadComponent: () =>
              import('./features/admin/content/contacts-editor/contacts-editor.component').then(
                (m) => m.ContactsEditorComponent
              )
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
