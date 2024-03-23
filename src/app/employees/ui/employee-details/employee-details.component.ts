import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../../shared/data-access/employee.service';
import { EmployeeOperationService } from '../../data-access/employee-operation.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [MatCardModule,  ReactiveFormsModule, MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private employeeOperationService = inject(EmployeeOperationService);
  private location = inject(Location);

  public mode: 'add' | 'edit' | 'view' = 'add';

  employeeForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    department: ['', Validators.required],
    position: ['', Validators.required],
    salary: ['', Validators.required],
    age: [0, Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required]
  });

  ngOnInit(): void {
    this.mode = this.employeeOperationService.mode;
    if (this.mode !== 'add') {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.employeeService.getEmployeeById(id).subscribe(employee => {
          if (employee) {
            this.employeeForm.patchValue(employee);
            if (this.mode === 'view') {
              this.employeeForm.disable();
            }
          }
        });
      }
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.mode === 'add') {
        this.employeeService.addNewEmployee(this.employeeForm.getRawValue()).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      } else if (this.mode === 'edit') {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
          console.error('ID is required for editing an employee');
          return;
        }
        const updatedEmployee = { id, ...this.employeeForm.getRawValue() };
        this.employeeService.updateEmployeeById(updatedEmployee).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
