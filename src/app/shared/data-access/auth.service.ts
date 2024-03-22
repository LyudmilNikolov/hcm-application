import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Credentials } from '../interfaces/credentials';

interface AuthUser {
  email: string;
  username: string;
  type: 'HR Admin' | 'Normal User';
  privileges: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  // Check if user is logged in by checking the cookie
  isLoggedIn() {
    return this.cookieService.check('username');
  }

  login(credentials: Credentials): Observable<AuthUser | null> {
    // Simulate an asynchronous login process
    return of(this.mockSignIn(credentials.email, credentials.password)).pipe(
      map(user => {
        if (user) {
          // Set cookies if the user is successfully logged in
          this.cookieService.set('username', user.username);
          this.cookieService.set('userType', user.type);
          this.cookieService.set('privileges', JSON.stringify(user.privileges));
          return user;
        }
        return null;
      })
    );
  }

  logout() {
    // Clear cookies on logout
    this.cookieService.deleteAll();
  }

  private mockSignIn(email: string, password: string): AuthUser | null {
    // Check if the email and password are not empty as a basic validation
    if (email && password) {
      const username = email.split('@')[0];
      const domain = email.split('@')[1];

      if (domain === 'hradmin') {
        // HR Admin
        return {
          email,
          username,
          type: 'HR Admin',
          privileges: ['view', 'edit', 'delete'],
        };
      } else {
        // Normal User
        return {
          email,
          username,
          type: 'Normal User',
          privileges: ['view'],
        };
      }
    }
    return null; // Return null if login failed
  }
}
