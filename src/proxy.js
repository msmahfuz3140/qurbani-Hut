import { NextResponse } from "next/server";

// Middleware (proxy) runs on Edge Runtime - NO Node.js-specific imports allowed
// Only protect minimal routes - auth checks on details pages are done client-side
export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check for any session-related cookies from better-auth
  const cookies = req.cookies;
  const hasSession = cookies.get("better-auth.session_token") ||
    cookies.get("better-auth.session") ||
    cookies.get("__session") ||
    cookies.get("better-auth.session_token_0");

  // Only protect the /my-profile route
  if (pathname.startsWith("/my-profile") && !hasSession) {
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
  matcher: ["/login", "/register", "/my-profile"],
};