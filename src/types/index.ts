export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token?: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  birthDate: string;
  image: string;
  company: {
    department: string;
    name: string;
    title: string;
    address?: {
      address: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  address?: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  // Custom fields for our app
  status?: 'Active' | 'Inactive';
  joinedDate?: string;
}

export interface EmployeesResponse {
  users: Employee[];
  total: number;
  skip: number;
  limit: number;
}

export interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}
