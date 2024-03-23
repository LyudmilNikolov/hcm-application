import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

interface Employee {
  _id: string;
  name: string;
  email: string;
  username: string;
  is_super_user: number;
  department: string;
  position: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);

  constructor() {}

  getEmployeeById(id: string): Observable<Employee | undefined> {
    const employeesDataUrl = 'assets/data/employees.json';
    return this.http.get<Employee[]>(employeesDataUrl).pipe(
      map(employees => employees.find(emp => emp._id === id))
    );
  }
}
