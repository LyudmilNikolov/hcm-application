import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../shared/data-access/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private cookieService = inject(CookieService);

  public user = '';
  constructor() {
    this.user = this.cookieService.get('name');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}