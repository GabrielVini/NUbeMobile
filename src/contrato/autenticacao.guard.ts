import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, type CanActivateFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';

export const autenticacaoGuard: CanActivateFn = () => {
  const http = inject(HttpClient);
  const router = inject(Router);
  return http.get('/api/auth/me', { withCredentials: true }).pipe(
    map(() => true),
    catchError(() => of(router.createUrlTree(['/login'])))
  );
};
