/**
 * Drizzle ORM client backed by Neon serverless Postgres.
 * If DATABASE_URL is missing, exports a proxy that throws clearly when used.
 *
 * Usage:
 *   import { db } from "@/lib/db/client";
 *   const rows = await db.select().from(users);
 */

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/lib/db/schema";

type DrizzleClient = ReturnType<typeof drizzle<typeof schema>>;

let _db: DrizzleClient | null = null;

function makeDb(): DrizzleClient {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return new Proxy({} as DrizzleClient, {
      get() {
        throw new Error(
          "[db] DATABASE_URL is not set. Configure Neon Postgres in .env.local to use the database.",
        );
      },
    });
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

export const db: DrizzleClient = (() => {
  if (!_db) _db = makeDb();
  return _db;
})();

export { schema };
