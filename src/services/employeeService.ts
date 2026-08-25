import type { Employee, EmployeesResponse } from '../types';

const API_BASE = 'https://dummyjson.com';

export const employeeService = {
  async getEmployees(limit = 10, skip = 0): Promise<EmployeesResponse> {
    const response = await fetch(
      `${API_BASE}/users?limit=${limit}&skip=${skip}&select=id,firstName,lastName,email,phone,age,gender,birthDate,image,company,address`
    );
    if (!response.ok) throw new Error('Failed to fetch employees');
    return response.json();
  },

  async getEmployee(id: number): Promise<Employee> {
    const response = await fetch(
      `${API_BASE}/users/${id}?select=id,firstName,lastName,email,phone,age,gender,birthDate,image,company,address`
    );
    if (!response.ok) throw new Error('Failed to fetch employee');
    return response.json();
  },

  async searchEmployees(query: string, limit = 10, skip = 0): Promise<EmployeesResponse> {
    const response = await fetch(
      `${API_BASE}/users/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}&select=id,firstName,lastName,email,phone,age,gender,birthDate,image,company,address`
    );
    if (!response.ok) throw new Error('Failed to search employees');
    return response.json();
  },

  async createEmployee(data: Partial<Employee>): Promise<Employee> {
    const response = await fetch(`${API_BASE}/users/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create employee');
    return response.json();
  },

  async updateEmployee(id: number, data: Partial<Employee>): Promise<Employee> {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update employee');
    return response.json();
  },

  async deleteEmployee(id: number): Promise<{ id: number; isDeleted: boolean }> {
    const response = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete employee');
    return response.json();
  },
};
