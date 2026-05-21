import {
  pgTable,
  text,
  timestamp,
  jsonb,
  boolean,
  integer,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

/**
 * Universal Communication Center — schema for the multi-channel engine.
 *
 * Conversations group threaded messages between participants.
 * Announcements broadcast to a recipient query (role/group/status/tag/etc.).
 * Messages carry the payload + per-channel delivery rows.
 *
 * NOTE: We don't lock providers here — every channel adapter ultimately
 * resolves to a row in `messageDeliveries` with a `channel` enum-as-text.
 */

export const conversations = pgTable(
  "conversations",
  {
    id: text("id").primaryKey(),
    type: text("type").notNull().default("direct"),
    subject: text("subject"),
    moduleId: text("module_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    lastMessageAt: timestamp("last_message_at"),
    createdBy: text("created_by"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    archivedAt: timestamp("archived_at"),
  },
  (table) => ({
    typeIdx: index("conversations_type_idx").on(table.type),
    moduleIdx: index("conversations_module_idx").on(table.moduleId),
    lastMsgIdx: index("conversations_last_msg_idx").on(table.lastMessageAt),
  }),
);

export const conversationParticipants = pgTable(
  "conversation_participants",
  {
    conversationId: text("conversation_id")
      .notNull()
      .references(() => conversations.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull(),
    role: text("role").notNull().default("participant"),
    mutedUntil: timestamp("muted_until"),
    lastReadAt: timestamp("last_read_at"),
    joinedAt: timestamp("joined_at").notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.conversationId, table.userId] }),
    userIdx: index("conversation_participants_user_idx").on(table.userId),
  }),
);

export const announcements = pgTable(
  "announcements",
  {
    id: text("id").primaryKey(),
    title: text("title").notNull(),
    bodyMd: text("body_md").notNull(),
    messageType: text("message_type").notNull().default("announcement"),
    priority: text("priority").notNull().default("normal"),
    recipientQuery: jsonb("recipient_query")
      .$type<{ filters: Array<{ key: string; operator: string; value: unknown }> } | null>(),
    channels: jsonb("channels").$type<string[]>().notNull().default([]),
    scheduleAt: timestamp("schedule_at"),
    sentAt: timestamp("sent_at"),
    status: text("status").notNull().default("draft"),
    templateId: text("template_id"),
    createdBy: text("created_by"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
  },
  (table) => ({
    statusIdx: index("announcements_status_idx").on(table.status),
    scheduleIdx: index("announcements_schedule_idx").on(table.scheduleAt),
  }),
);

export const messages = pgTable(
  "messages",
  {
    id: text("id").primaryKey(),
    conversationId: text("conversation_id").references(() => conversations.id, {
      onDelete: "cascade",
    }),
    announcementId: text("announcement_id").references(() => announcements.id, {
      onDelete: "set null",
    }),
    senderUserId: text("sender_user_id"),
    senderRole: text("sender_role"),
    messageType: text("message_type").notNull().default("direct_message"),
    body: text("body").notNull(),
    bodyHtml: text("body_html"),
    attachments: jsonb("attachments").$type<
      Array<{ id: string; url: string; mime: string; name: string; sizeBytes?: number }>
    >().notNull().default([]),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    editedAt: timestamp("edited_at"),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    conversationIdx: index("messages_conversation_idx").on(table.conversationId),
    senderIdx: index("messages_sender_idx").on(table.senderUserId),
    createdIdx: index("messages_created_idx").on(table.createdAt),
  }),
);

export const messageDeliveries = pgTable(
  "message_deliveries",
  {
    id: text("id").primaryKey(),
    messageId: text("message_id")
      .notNull()
      .references(() => messages.id, { onDelete: "cascade" }),
    recipientUserId: text("recipient_user_id"),
    recipientAddress: text("recipient_address"),
    channel: text("channel").notNull(),
    providerMessageId: text("provider_message_id"),
    status: text("status").notNull().default("queued"),
    error: text("error"),
    queuedAt: timestamp("queued_at").notNull().defaultNow(),
    sentAt: timestamp("sent_at"),
    deliveredAt: timestamp("delivered_at"),
    readAt: timestamp("read_at"),
    repliedAt: timestamp("replied_at"),
    attempts: integer("attempts").notNull().default(0),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
  },
  (table) => ({
    messageIdx: index("message_deliveries_message_idx").on(table.messageId),
    recipientIdx: index("message_deliveries_recipient_idx").on(table.recipientUserId),
    statusIdx: index("message_deliveries_status_idx").on(table.status),
    channelIdx: index("message_deliveries_channel_idx").on(table.channel),
  }),
);

export const messageTemplates = pgTable("message_templates", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  messageType: text("message_type").notNull(),
  channels: jsonb("channels").$type<string[]>().notNull().default([]),
  subjectEn: text("subject_en"),
  subjectEs: text("subject_es"),
  bodyEn: text("body_en").notNull(),
  bodyEs: text("body_es").notNull(),
  variables: jsonb("variables").$type<string[]>().notNull().default([]),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  updatedBy: text("updated_by"),
});

export const automationRules = pgTable("automation_rules", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  trigger: jsonb("trigger").$type<{ event: string; conditions?: Record<string, unknown> }>().notNull(),
  templateId: text("template_id").references(() => messageTemplates.id, { onDelete: "set null" }),
  channels: jsonb("channels").$type<string[]>().notNull().default([]),
  recipientQuery: jsonb("recipient_query")
    .$type<{ filters: Array<{ key: string; operator: string; value: unknown }> } | null>(),
  enabled: boolean("enabled").notNull().default(true),
  lastRunAt: timestamp("last_run_at"),
  runCount: integer("run_count").notNull().default(0),
  createdBy: text("created_by"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pushSubscriptions = pgTable(
  "push_subscriptions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    endpoint: text("endpoint").notNull(),
    p256dh: text("p256dh"),
    auth: text("auth"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    lastUsedAt: timestamp("last_used_at"),
  },
  (table) => ({
    userIdx: index("push_subscriptions_user_idx").on(table.userId),
  }),
);
