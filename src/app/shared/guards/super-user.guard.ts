import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  private router = inject(Router);
  private cookieService = inject(CookieService);
  private isSuperUser = this.cookieService.get('is_super_user') === '1';

  canActivate(): boolean {
    if (this.isSuperUser) {
      return true;
    } else {
      this.router.navigate(['/employees']);
      return false;
    }
  }
}

export const superUserGuard: CanActivateFn = (): boolean => {
  return inject(PermissionsService).canActivate();
}