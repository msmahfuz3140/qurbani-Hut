import { NextResponse } from "next/server";

// Middleware (proxy) runs on Edge Runtime - NO Node.js-specific imports allowed
export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check for any session-related cookies from better-auth
  const cookies = req.cookies;
  const hasSession = cookies.get("better-auth.session_token") ||
    cookies.get("better-auth.session") ||
    cookies.get("__session") ||
    cookies.get("better-auth.session_token_0");

  // Protect /my-profile route
  if (pathname.startsWith("/my-profile") && !hasSession) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protect animal details pages (e.g. /animals/1, /animals/5)
  // Only match paths that have a numeric segment after /animals/
  const isAnimalDetail = /^\/animals\/\d+(\/.*)?$/.test(pathname);
  if (isAnimalDetail && !hasSession) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
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