import { Route } from '@angular/router';
import { superUserGuard } from '../shared/guards/super-user.guard';

export const EMPLOYEES_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./employees.component').then(employeesModule => employeesModule.EmployeesComponent),
  },
  {
    path: ':id',
    canActivate: [superUserGuard],
    loadComponent: () => import('./ui/employee-details/employee-details.component').then(employeesModule => employeesModule.EmployeeDetailsComponent),
  },
];