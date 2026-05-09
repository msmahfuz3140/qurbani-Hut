import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export default async function middleware(req) {
  // Check if user is trying to access login/register page while already authenticated
  if (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')) {
    const session = await auth.api.getSession({
      headers: req.headers,
    cookies: req.cookies,
    query: req.query,
    method: req.method,
    body: req.body,
    context: {
      // Pass any additional context if needed
    }
    });

    // If user is already authenticated, redirect to home page instead of login/register
    if (session?.user) {
      return Response.redirect(new URL('/', req.url));
    }
  }

  // Continue with normal auth handler
  return toNextJsHandler(auth)(req);
}
