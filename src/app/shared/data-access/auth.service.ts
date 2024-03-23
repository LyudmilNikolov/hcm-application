import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Credentials } from '../interfaces/credentials';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cookieService = inject(CookieService);
  private http = inject(HttpClient);

  isLoggedIn(): boolean {
    return this.cookieService.check('name');
  }

  getCurrentUserId(): string {
    return this.cookieService.get('id');
  }

  login(credentials: Credentials): Observable<{ success: boolean; message: string }> {
    const employeesDataUrl = 'http://localhost:3000/employees';

    return this.http.get<Employee[]>(employeesDataUrl).pipe(
      map((employees) => {
        const user = employees.find(emp => emp.email === credentials.email);
        if (user) {
          this.cookieService.set('name', user.name);
          this.cookieService.set('id', user.id);
          this.cookieService.set('is_super_user', String(user.is_super_user));
          this.cookieService.set('department', user.department);
          this.cookieService.set('position', user.position);
          return { success: true, message: 'Login successful' };
        }
        return { success: false, message: 'User not found' };
      }),
      catchError(() => of({ success: false, message: 'An error occurred' }))
    );
  }

  logout(): void {
    this.cookieService.deleteAll();
  }
}
