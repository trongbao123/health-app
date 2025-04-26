import { mockEmployees } from "@/mocks/employee.factory";

export type Employee = {
  staffId: number;
  email: string;
  password: string;
  fullName: string;
};

export class EmployeeAuthService {
  private static readonly db: Employee[] = mockEmployees;
  static authenticate(email: string, password: string): Employee | null {
    return (
      this.db.find((emp) => emp.email === email && emp.password === password) ||
      null
    );
  }

  static findById(staffId: number): Employee | null {
    return this.db.find((e) => e.staffId === staffId) || null;
  }
}
