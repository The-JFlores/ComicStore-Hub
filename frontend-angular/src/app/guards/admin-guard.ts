import { inject } from '@angular/core';

import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  filter,
  map,
  take
} from 'rxjs/operators';

import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = () => {

  const authService =
    inject(AuthService);

  const router =
    inject(Router);

  return authService.currentUser$
    .pipe(

      // esperar hasta que auth termine
      filter(user => user !== undefined),

      take(1),

      map(user => {

        if (
          user &&
          user.role === 'admin'
        ) {

          return true;
        }

        return router.parseUrl('/login');
      })
    );
};