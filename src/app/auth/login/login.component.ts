import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/data-access/auth.service';
import { Credentials } from '../../shared/interfaces/credentials';
import { LoginFormComponent } from './ui/login-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, LoginFormComponent, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public authService = inject(AuthService);
  private router = inject(Router);

  public loginStatus: 'idle' | 'authenticating' | 'error' = 'idle';

  constructor() {
    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(['home']);
    // }
  }

  handleLogin(credentials: Credentials) {
    this.loginStatus = 'authenticating';
    this.authService.login(credentials).subscribe(user => {
      if (user) {
        this.router.navigate(['home']);
      }
    });
  }
}