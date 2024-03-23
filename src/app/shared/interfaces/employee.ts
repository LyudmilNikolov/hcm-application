export interface Employee {
  id: string;
  name: string;
  email: string;
  is_super_user?: number;
  department: string;
  position: string;
  salary?: string;
  age?: number;
  address?: string;
}

export interface NewEmployee {
  name: string;
  email: string;
  department: string;
  position: string;
  salary?: string;
  age?: number;
  address?: string; 
}