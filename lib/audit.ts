/**
 * Audit log writer — call this from every admin mutation.
 * Soft-fails when DATABASE_URL is missing (no-op in dev without a db).
 */

import { db } from "@/lib/db/client";
import { auditLogs } from "@/lib/db/schema/audit";
import type { AuthUser } from "@/lib/auth";

export interface AuditEntry {
  action: string;
  targetType?: string;
  targetId?: string;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
  metadata?: Record<string, unknown> | null;
}

export interface AuditContext {
  actor?: AuthUser | null;
  ip?: string | null;
  userAgent?: string | null;
}

function uid(): string {
  return `aud_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export async function audit(entry: AuditEntry, context: AuditContext = {}): Promise<void> {
  if (!process.env.DATABASE_URL) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[audit:skip]", entry.action, entry.targetType, entry.targetId);
    }
    return;
  }
  try {
    await db.insert(auditLogs).values({
      id: uid(),
      actorUserId: context.actor?.id ?? null,
      actorEmail: context.actor?.email ?? null,
      actorRole: context.actor?.role ?? null,
      action: entry.action,
      targetType: entry.targetType ?? null,
      targetId: entry.targetId ?? null,
      before: entry.before ?? null,
      after: entry.after ?? null,
      ip: context.ip ?? null,
      userAgent: context.userAgent ?? null,
      metadata: entry.metadata ?? null,
    });
  } catch (err) {
    console.error("[audit:error]", err);
  }
}
