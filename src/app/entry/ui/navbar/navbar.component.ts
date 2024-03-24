import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ROUTE_PATHS } from '../../../shared/constants/route-paths.constants';
import { AuthService } from '../../../shared/data-access/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);

  public user = this.cookieService.get('name');
  
  constructor() {}

  logout(): void {
    this.authService.logout();
    this.router.navigate([ROUTE_PATHS.LOGIN]);
  }
}