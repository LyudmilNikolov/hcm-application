import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EmployeeService } from '../shared/data-access/employee.service';
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
  displayedColumns: string[] = ['select', 'name', 'email', 'department', 'position', 'phone'];
  employees: Employee[] = [];
  isSuperUser: boolean = false;
  selection = new SelectionModel<Employee>(true, []);

  constructor(private employeeService: EmployeeService, private cookieService: CookieService, private router: Router, private employeeOperationService: EmployeeOperationService) {}

  ngOnInit(): void {
    this.refreshTable();
    this.isSuperUser = this.cookieService.get('is_super_user') === '1';
  }

  refreshTable(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  addUser(): void {
    this.employeeOperationService.mode = 'add';
    this.router.navigate(['employees/0']);
  }

  editUser(): void {
    const selectedEmployee = this.selection.selected[0];
    this.employeeOperationService.mode = 'edit';
    this.router.navigate(['employees/', selectedEmployee.id]);
  }

  viewUser(): void {
    const selectedEmployee = this.selection.selected[0];
    this.employeeOperationService.mode = 'view';
    this.router.navigate(['employees/', selectedEmployee.id]);
  }

  deleteUser(): void {
    this.employeeService.deleteEmployeeById(this.selection.selected[0].id).subscribe();
    this.selection.clear();
    this.refreshTable();
  }
}