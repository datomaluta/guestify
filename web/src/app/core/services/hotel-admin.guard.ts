import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const hotelAdminGuard: CanActivateFn = async (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.readyPromise;

  const profile = auth.profile();
  if (!profile) return router.parseUrl('/admin');
  if (profile.role === 'superadmin') return true;

  const hotelId = route.paramMap.get('hotelId');
  if (profile.role === 'hotel_admin' && hotelId && auth.adminHotelIds().includes(hotelId)) return true;

  return router.parseUrl('/admin');
};
