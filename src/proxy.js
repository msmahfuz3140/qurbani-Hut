import { NextResponse } from "next/server";

// Minimal proxy - only redirects logged-in users away from login/register
// All other route protection is done client-side for reliability
export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Only redirect authenticated users away from login/register
  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    // Check for any session-related cookies from better-auth
    const cookies = req.cookies;
    const hasSession = cookies.get("better-auth.session_token") ||
      cookies.get("better-auth.session") ||
      cookies.get("__session") ||
      cookies.get("better-auth.session_token_0");

    if (hasSession) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/animals/:path*", "/my-profile"],
};