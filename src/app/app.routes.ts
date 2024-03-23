import { Routes } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { isAuthenticatedGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    canActivate: [isAuthenticatedGuard],
    canActivateChild: [isAuthenticatedGuard],
    component: EntryComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'employees',
        children: [
          {
            path: '',
            loadComponent: () => import('./employees/employees.component').then(m => m.EmployeesComponent),
          },
          {
            path: ':id',
            loadComponent: () => import('./employees/ui/employee-details/employee-details.component').then(m => m.EmployeeDetailsComponent),
          }
        ]
      },
    ],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];