import { createAuthClient } from "better-auth/react";

/**
 * Omit baseURL when NEXT_PUBLIC_* is unset so Better Auth resolves same-origin
 * `/api/auth` in the browser (works on 3000, 3001, or any dev port).
 * Set NEXT_PUBLIC_APP_URL (or NEXT_PUBLIC_BETTER_AUTH_URL) in production behind a canonical domain.
 */
export const authClient = createAuthClient(
  process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL
    ? {
        baseURL:
          process.env.NEXT_PUBLIC_APP_URL ||
          process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
      }
    : {}
);
