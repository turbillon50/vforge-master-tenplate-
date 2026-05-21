import { pgTable, text, timestamp, jsonb, index } from "drizzle-orm/pg-core";

/**
 * Activity timeline / audit logs — every mutation that touches admin or
 * security-sensitive data writes here via `lib/audit.ts#audit()`.
 *
 * Tracked: user actions, admin actions, payment events, role changes,
 * login events, module activations, deletion requests, integration changes,
 * content updates.
 */
export const auditLogs = pgTable(
  "audit_logs",
  {
    id: text("id").primaryKey(),
    actorUserId: text("actor_user_id"),
    actorEmail: text("actor_email"),
    actorRole: text("actor_role"),
    action: text("action").notNull(),
    targetType: text("target_type"),
    targetId: text("target_id"),
    before: jsonb("before").$type<Record<string, unknown> | null>(),
    after: jsonb("after").$type<Record<string, unknown> | null>(),
    ip: text("ip"),
    userAgent: text("user_agent"),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    actorIdx: index("audit_logs_actor_idx").on(table.actorUserId),
    actionIdx: index("audit_logs_action_idx").on(table.action),
    targetIdx: index("audit_logs_target_idx").on(table.targetType, table.targetId),
    createdAtIdx: index("audit_logs_created_at_idx").on(table.createdAt),
  }),
);
