import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeOperationService {
  private _mode: 'add' | 'edit' | 'view' = 'view';

  set mode(mode: 'add' | 'edit' | 'view') {
    this._mode = mode;
  }

  get mode(): 'add' | 'edit' | 'view' {
    return this._mode;
  }
}