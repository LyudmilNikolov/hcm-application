import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ROUTE_PATHS } from '../constants/route-paths.constants';
import { UserType } from '../enums/user-type.enum';

@Injectable({
  providedIn: 'root',
})
class PermissionsService {
  private router = inject(Router);
  private cookieService = inject(CookieService);
  private isSuperUser = this.cookieService.get('is_super_user') === UserType.IS_SUPER_USER;

  canActivate(): boolean {
    if (this.isSuperUser) {
      return true;
    } else {
      this.router.navigate([ROUTE_PATHS.EMPLOYEES]);
      return false;
    }
  }
}

export const superUserGuard: CanActivateFn = (): boolean => {
  return inject(PermissionsService).canActivate();
}