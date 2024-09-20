import { Inject, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const userRole = authService.getUserRole();

  const requiredRole = route.data['role'];
  console.log(requiredRole)
  return authService.isAuthenticated() && userRole === requiredRole;
};

