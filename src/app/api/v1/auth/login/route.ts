import { NextRequest } from "next/server";
import { HttpStatus } from "@/lib/https/http-status";
import { ApiResponse } from "@/lib/https/http-response";
import { SessionCookieManager } from "@/lib/cookie";
import { Logger } from "@/lib/core/logger";
import { SessionService } from "@/lib/session/session";
import { EmployeeAuthService } from "@/services/api/auth/auth.service";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const missing = !email ? "Email" : !password ? "Password" : null;

    if (missing) {
      return ApiResponse.fail(
        `${missing} is required`,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    const employee = EmployeeAuthService.authenticate(email, password);

    if (!employee) {
      return ApiResponse.fail(
        "Invalid email or password",
        HttpStatus.UNAUTHORIZED
      );
    }

    const sessionKey = SessionService.generate(employee.staffId);

    const response = ApiResponse.success(
      {
        staffId: employee.staffId,
        name: employee.fullName,
        username: employee.email,
      },
      HttpStatus.OK
    );

    SessionCookieManager.set(response, sessionKey);

    return response;
  } catch (err) {
    Logger.error("Login error:", err);
    return ApiResponse.fail("Login failed", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
