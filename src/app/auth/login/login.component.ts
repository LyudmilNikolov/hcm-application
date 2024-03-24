import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { ROUTE_PATHS } from '../../shared/constants/route-paths.constants';
import { AuthService } from '../../shared/data-access/auth.service';
import { LoginStatus } from '../../shared/enums/login-status.enum';
import { Credentials } from '../../shared/interfaces/credentials';
import { LoginFormComponent } from './ui/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, LoginFormComponent, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public authService = inject(AuthService);
  private router = inject(Router);

  public loginStatus: LoginStatus = LoginStatus.IDLE;

  constructor() {}

  handleLogin(credentials: Credentials) {
    this.loginStatus = LoginStatus.AUTHENTICATING;
    this.authService.login(credentials).subscribe(response => {
      if (response.success) {
        this.router.navigate([ROUTE_PATHS.HOME]);
      } else {
        this.loginStatus = LoginStatus.ERROR;
      }
    });
  }
}