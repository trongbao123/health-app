import { ApiResponse } from "@/lib/https/http-response";
import { HttpStatus } from "@/lib/https/http-status";
import { SessionCookieManager } from "@/lib/cookie";
import { Logger } from "@/lib/core/logger";

export async function POST() {
  const response = ApiResponse.success({ success: true }, HttpStatus.OK);

  SessionCookieManager.clear(response);

  Logger.info("User logged out: session cookie cleared");

  return response;
}
