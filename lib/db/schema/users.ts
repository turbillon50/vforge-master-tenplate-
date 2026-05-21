import {
  pgTable,
  text,
  timestamp,
  boolean,
  jsonb,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

/**
 * Mirror of Clerk users with app-specific role + metadata.
 * `id` mirrors Clerk user id (string, externally owned).
 */
export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    fullName: text("full_name"),
    imageUrl: text("image_url"),
    role: text("role").notNull().default("customer"),
    locale: text("locale").default("es"),
    theme: text("theme").default("dark"),
    phone: text("phone"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    suspended: boolean("suspended").notNull().default(false),
    suspendedReason: text("suspended_reason"),
    lastSeenAt: timestamp("last_seen_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    emailIdx: index("users_email_idx").on(table.email),
    roleIdx: index("users_role_idx").on(table.role),
  }),
);

/**
 * Tag system — used by communication recipient filters, segmentation,
 * and module-specific labels.
 */
export const tags = pgTable("tags", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  label: text("label").notNull(),
  color: text("color"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userTags = pgTable(
  "user_tags",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
    assignedAt: timestamp("assigned_at").notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.tagId] }),
  }),
);

/**
 * Per-user permission overrides on top of role permissions.
 * Positive (granted) or negative (revoked) deltas.
 */
export const userPermissions = pgTable(
  "user_permissions",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    permission: text("permission").notNull(),
    granted: boolean("granted").notNull().default(true),
    grantedAt: timestamp("granted_at").notNull().defaultNow(),
    grantedBy: text("granted_by"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.permission] }),
  }),
);

/**
 * Groups — generic role-adjacent grouping used by communication filters
 * (e.g. "Parents of Group 3A", "Drivers in Mexico City", "Gold members").
 */
export const groups = pgTable("groups", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const userGroups = pgTable(
  "user_groups",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    groupId: text("group_id")
      .notNull()
      .references(() => groups.id, { onDelete: "cascade" }),
    joinedAt: timestamp("joined_at").notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.groupId] }),
  }),
);
