import { NextResponse } from "next/server";

// Middleware (proxy) runs on Edge Runtime - NO Node.js-specific imports allowed
export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only protect my-profile route
  if (pathname.startsWith("/my-profile")) {
    // Check for session cookie from better-auth
    const sessionCookie = req.cookies.get("better-auth.session_token") ||
      req.cookies.get("better-auth.session") ||
      req.cookies.get("__session");

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Redirect authenticated users away from login/register
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    const sessionCookie = req.cookies.get("better-auth.session_token") ||
      req.cookies.get("better-auth.session") ||
      req.cookies.get("__session");

    if (sessionCookie) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/my-profile"],
};