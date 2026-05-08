import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request) {
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
  } catch (e) {
    console.error("[proxy] getSession failed (check MONGO_URI & network):", e);
  }
  const { pathname } = request.nextUrl;

  const authRoutes = ["/login", "/register"];

  if (session && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/my-profile", request.url));
  }

  const isProfilePage = pathname === "/my-profile";

  const isProductDetailPage =
    pathname.startsWith("/products/") && pathname !== "/products";

  if (!session && (isProfilePage || isProductDetailPage)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/my-profile", "/login", "/register"],
};
