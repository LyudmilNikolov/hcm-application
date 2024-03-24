import { Injectable } from '@angular/core';
import { EmployeeOperation } from '../../shared/enums/employee-operation.enum';

@Injectable({
  providedIn: 'root',
})
export class EmployeeOperationService {
  private _mode: EmployeeOperation = EmployeeOperation.VIEW;

  set mode(mode: EmployeeOperation) {
    this._mode = mode;
  }

  get mode(): EmployeeOperation {
    return this._mode;
  }
}