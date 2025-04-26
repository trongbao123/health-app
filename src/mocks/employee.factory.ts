import { Employee } from "@/services/api/auth/auth.service";

export const mockEmployees: Employee[] = [
  {
    staffId: 101,
    email: "admin@gmail.com",
    password: "123456",
    fullName: "Admin",
  },
  {
    staffId: 202,
    email: "aiko",
    password: "aiko321",
    fullName: "Aiko Tanaka",
  },
];
