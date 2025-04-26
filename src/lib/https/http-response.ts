import { NextResponse } from "next/server";
import { HttpStatus } from "./http-status";

export class ApiResponse {
  static success<T>(payload: T, status: HttpStatus = HttpStatus.OK) {
    return NextResponse.json({ success: true, payload }, { status });
  }

  static fail(
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
  ) {
    return NextResponse.json({ success: false, message }, { status });
  }
}
