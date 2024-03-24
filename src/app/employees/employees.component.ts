import { SelectionModel } from '@angular/cdk/collections';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EMPLOYEE_TABLE_COLUMNS, EmployeeTableColumn } from '../shared/constants/employee-table-columns.constants';
import { ROUTE_PATHS } from '../shared/constants/route-paths.constants';
import { EmployeeService } from '../shared/data-access/employee.service';
import { EmployeeOperation } from '../shared/enums/employee-operation.enum';
import { UserType } from '../shared/enums/user-type.enum';
import { Employee } from '../shared/interfaces/employee';
import { EmployeeTableComponent } from '../shared/ui/employee-table/employee-table.component';
import { EmployeeOperationService } from './data-access/employee-operation.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatCheckboxModule, EmployeeTableComponent, MatIconModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  displayedColumns: EmployeeTableColumn[] = [
    EMPLOYEE_TABLE_COLUMNS.SELECT,
    EMPLOYEE_TABLE_COLUMNS.NAME,
    EMPLOYEE_TABLE_COLUMNS.EMAIL,
    EMPLOYEE_TABLE_COLUMNS.DEPARTMENT,
    EMPLOYEE_TABLE_COLUMNS.POSITION,
    EMPLOYEE_TABLE_COLUMNS.PHONE,
  ];
  employees: Employee[] = [];
  isSuperUser: boolean = false;
  selection = new SelectionModel<Employee>(true, []);

  private destroyRef = inject(DestroyRef);

  constructor(private employeeService: EmployeeService, private cookieService: CookieService, private router: Router, private employeeOperationService: EmployeeOperationService) {}

  ngOnInit(): void {
    this.refreshTable();
    this.isSuperUser = this.cookieService.get('is_super_user') === UserType.IS_SUPER_USER;
  }

  refreshTable(): void {
    this.employeeService.getEmployees().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(employees => {
      this.employees = employees;
    });
  }

  addUser(): void {
    this.employeeOperationService.mode = EmployeeOperation.ADD;
    this.router.navigate([ROUTE_PATHS.NEW_EMPLOYEE]);
  }

  editUser(): void {
    const selectedEmployee = this.selection.selected[0];
    this.employeeOperationService.mode = EmployeeOperation.EDIT;
    this.router.navigate([ROUTE_PATHS.EMPLOYEES, selectedEmployee.id]);
  }

  viewUser(): void {
    const selectedEmployee = this.selection.selected[0];
    this.employeeOperationService.mode = EmployeeOperation.VIEW;
    this.router.navigate([ROUTE_PATHS.EMPLOYEES, selectedEmployee.id]);
  }

  deleteUser(): void {
    this.employeeService.deleteEmployeeById(this.selection.selected[0].id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.selection.clear();
        this.refreshTable();
      });
  }
}