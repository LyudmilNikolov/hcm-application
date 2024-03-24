export interface NewEmployee {
  name: string;
  email: string;
  department: string;
  position: string;
  salary?: string;
  age?: number;
  address?: string;
}

export interface Employee extends NewEmployee {
  id: string;
  is_super_user?: number;
}