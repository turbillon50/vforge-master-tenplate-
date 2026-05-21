/**
 * Clerk is wired through middleware.ts + app/layout.tsx ClerkProvider.
 * Use helpers from `lib/auth.ts` instead of @clerk/nextjs directly in services.
 */
export { getCurrentUser, requireUser, requireAdmin, requireStaff } from "@/lib/auth";
export const isClerkConfigured = (): boolean =>
  Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  );
