import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/", "/my-record"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  const authToken = request.cookies.get("health-app-token")?.value;

  if (!authToken && isProtectedPath) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g. robots.txt)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
