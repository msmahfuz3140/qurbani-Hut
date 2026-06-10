import { NextResponse } from "next/server";

// Middleware (proxy) runs on Edge Runtime - NO Node.js-specific imports allowed
export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check for session cookie from better-auth
  const hasSession = req.cookies.get("better-auth.session_token") ||
    req.cookies.get("better-auth.session") ||
    req.cookies.get("__session");

  // Protect /my-profile route
  if (pathname.startsWith("/my-profile") && !hasSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Protect animal details pages: /animals/1, /animals/2, etc. (not /animals list page)
  const isAnimalDetail = /^\/animals\/\d+/.test(pathname);
  if (isAnimalDetail && !hasSession) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect authenticated users away from login/register
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (hasSession) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/my-profile", "/animals/:path*"],
};