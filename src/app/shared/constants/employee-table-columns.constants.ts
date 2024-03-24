export const EMPLOYEE_TABLE_COLUMNS = {
  SELECT: 'select',
  NAME: 'name',
  EMAIL: 'email',
  DEPARTMENT: 'department',
  POSITION: 'position',
  PHONE: 'phone',
} as const;

export type EmployeeTableColumn = typeof EMPLOYEE_TABLE_COLUMNS[keyof typeof EMPLOYEE_TABLE_COLUMNS];