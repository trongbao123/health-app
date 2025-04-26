import { type NextRequest } from "next/server";
import { ApiResponse } from "@/lib/https/http-response";
import { HttpStatus } from "@/lib/https/http-status";
import { SessionCookieManager } from "@/lib/cookie";
import { Logger } from "@/lib/core/logger";
import { SessionService } from "@/lib/session/session";
import { EmployeeAuthService } from "@/services/api/auth/auth.service";

export async function GET(request: NextRequest) {
  try {
    const sessionKey = SessionCookieManager.get(request);

    if (!sessionKey) {
      return ApiResponse.fail("Session not found", HttpStatus.UNAUTHORIZED);
    }

    const staffId = SessionService.extractStaffId(sessionKey ?? "");

    if (!staffId) {
      return ApiResponse.fail("Session parse failed", HttpStatus.UNAUTHORIZED);
    }

    const employee = EmployeeAuthService.findById(staffId);

    if (!employee) {
      return ApiResponse.fail("Employee not found", HttpStatus.NOT_FOUND);
    }

    return ApiResponse.success(
      {
        authenticated: true,
        staffId: employee.staffId,
        name: employee.fullName,
        email: employee.email,
      },
      HttpStatus.OK
    );
  } catch (err) {
    Logger.error("Error fetching current user", err);
    return ApiResponse.fail("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
