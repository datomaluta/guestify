import { Routes } from '@angular/router';
import { hotelResolver } from './core/services/hotel.resolver';
import { adminHotelResolver } from './core/services/admin-hotel.resolver';
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
        path: 'essentials',
        loadComponent: () =>
          import('./features/guest/essentials/essentials.component').then((m) => m.EssentialsComponent),
        data: { preload: true }
      },
      {
        path: 'ai',
        loadComponent: () => import('./features/guest/ai/ai.component').then((m) => m.AiComponent)
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
        path: 'ai-topic-templates',
        canActivate: [superadminGuard],
        loadComponent: () =>
          import('./features/admin/ai-topic-templates/ai-topic-templates.component').then(
            (m) => m.AiTopicTemplatesComponent
          )
      },
      {
        path: 'content/:hotelId',
        canActivate: [hotelAdminGuard],
        resolve: { hotel: adminHotelResolver },
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
            path: 'essentials',
            loadComponent: () =>
              import('./features/admin/content/essentials-editor/essentials-editor.component').then(
                (m) => m.EssentialsEditorComponent
              )
          },
          {
            path: 'ai-topics',
            loadComponent: () =>
              import('./features/admin/content/ai-topics-editor/ai-topics-editor.component').then(
                (m) => m.AiTopicsEditorComponent
              )
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
