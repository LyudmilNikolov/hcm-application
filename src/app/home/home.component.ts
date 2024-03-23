import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../shared/data-access/auth.service';
import { EmployeeService } from '../shared/data-access/employee.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private authService = inject(AuthService);
  private employeeService = inject(EmployeeService);
  employee$ = this.employeeService.getEmployeeById(this.authService.getCurrentUserId());
}