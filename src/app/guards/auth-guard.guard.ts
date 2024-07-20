import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  const authService = inject(AuthService);

  const protectedRoutes: string[] = ['/', '/home'];

  const isLoggedIn = authService.isLoggedIn();

  if (isLoggedIn && (state.url === '/login' || state.url === '/register')) {
    router.navigate(['/']);
    return false;
  }

  if (protectedRoutes.includes(state.url) && !isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
