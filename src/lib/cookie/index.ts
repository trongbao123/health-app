import { AppConfig } from "@/configs/app.config";
import { sessionCookieOptions } from "@/configs/cookie-options.config";
import { NextResponse } from "next/server";

export class SessionCookieManager {
  static set(res: NextResponse, value: string) {
    res.cookies.set(AppConfig.token.name, value, sessionCookieOptions);
  }

  static clear(res: NextResponse) {
    res.cookies.set(AppConfig.token.name, "", {
      ...sessionCookieOptions,
      maxAge: 0,
    });
  }

  static get(req: Request): string | undefined {
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) return undefined;

    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => c.split("="))
    );
    return cookies[AppConfig.token.name];
  }
}
