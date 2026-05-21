/**
 * Neon integration is wired through `lib/db/client.ts`.
 * This file re-exports for convenience.
 */
export { db, schema } from "@/lib/db/client";
export const isNeonConfigured = (): boolean => Boolean(process.env.DATABASE_URL);
