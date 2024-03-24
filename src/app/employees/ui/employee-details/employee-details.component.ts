import { Location } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../shared/constants/route-paths.constants';
import { EmployeeService } from '../../../shared/data-access/employee.service';
import { EmployeeOperation } from '../../../shared/enums/employee-operation.enum';
import { EmployeeOperationService } from '../../data-access/employee-operation.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [MatCardModule,  ReactiveFormsModule, MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private employeeService = inject(EmployeeService);
  private employeeOperationService = inject(EmployeeOperationService);
  private location = inject(Location);
  private destroyRef = inject(DestroyRef);

  public mode: EmployeeOperation = EmployeeOperation.ADD;

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
    if (this.mode !== EmployeeOperation.ADD) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.employeeService.getEmployeeById(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(employee => {
          if (employee) {
            this.employeeForm.patchValue(employee);
            if (this.mode === EmployeeOperation.VIEW) {
              this.employeeForm.disable();
            }
          }
        });
      }
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.mode === EmployeeOperation.ADD) {
        this.employeeService.addNewEmployee(this.employeeForm.getRawValue())
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
          this.router.navigate([ROUTE_PATHS.EMPLOYEES]);
        });
      } else if (this.mode === EmployeeOperation.EDIT) {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
          console.error('ID is required for editing an employee');
          return;
        }
        const updatedEmployee = { id, ...this.employeeForm.getRawValue() };
        this.employeeService.updateEmployeeById(updatedEmployee)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
          this.router.navigate([ROUTE_PATHS.EMPLOYEES]);
        });
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
