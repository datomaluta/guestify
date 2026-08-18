import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const hotelAdminGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  await auth.readyPromise;

  if (auth.profile()?.role === 'hotel_admin' && auth.profile()?.hotel_id) return true;

  return router.parseUrl('/admin');
};
