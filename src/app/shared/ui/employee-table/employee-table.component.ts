import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { Employee } from '../../interfaces/employee';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent {
  @Input({ required: true }) employees: Employee[] = [];
  @Input({ required: true }) selection!: SelectionModel<Employee>;
  @Input({ required: true }) displayedColumns: string[] = [];

  constructor() {}

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.employees.length;
    return numSelected === numRows;
  }
  
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.employees.forEach(row => this.selection.select(row));
    }
  }
  
  checkboxLabel(row?: Employee): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }  
}
