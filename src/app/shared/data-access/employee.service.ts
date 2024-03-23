import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, NewEmployee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  private employeesDataUrl = 'http://localhost:3000/employees';

  constructor() {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesDataUrl);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.employeesDataUrl}/${id}`);
  }


  addNewEmployee(employee: NewEmployee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesDataUrl, employee);
  }

  updateEmployeeById(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.employeesDataUrl}/${employee.id}`, employee);
  }

  deleteEmployeeById(id: string) {
    return this.http.delete(`${this.employeesDataUrl}/${id}`);
  }
}
