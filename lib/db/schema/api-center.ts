import {
  pgTable,
  text,
  timestamp,
  jsonb,
  boolean,
  bigint,
  integer,
  index,
  numeric,
} from "drizzle-orm/pg-core";

/**
 * API keys — issued to users (or API customers). Raw secret is shown ONCE at
 * creation; we only persist the prefix and a hash for verification.
 */
export const apiKeys = pgTable(
  "api_keys",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    name: text("name").notNull(),
    prefix: text("prefix").notNull(),
    hashedSecret: text("hashed_secret").notNull(),
    scopes: jsonb("scopes").$type<string[]>().notNull().default([]),
    rateLimitPerMinute: integer("rate_limit_per_minute").notNull().default(60),
    rateLimitPerHour: integer("rate_limit_per_hour").notNull().default(1000),
    rateLimitPerDay: integer("rate_limit_per_day").notNull().default(10000),
    usageCap: bigint("usage_cap", { mode: "number" }),
    ipAllowList: jsonb("ip_allow_list").$type<string[] | null>(),
    expiresAt: timestamp("expires_at"),
    lastUsedAt: timestamp("last_used_at"),
    revokedAt: timestamp("revoked_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("api_keys_user_idx").on(table.userId),
    prefixIdx: index("api_keys_prefix_idx").on(table.prefix),
  }),
);

/**
 * Credit wallet — one row per user. Balance is in "credits" (template-defined unit).
 * Movements are recorded in `creditTransactions`.
 */
export const creditWallets = pgTable("credit_wallets", {
  userId: text("user_id").primaryKey(),
  balance: bigint("balance", { mode: "number" }).notNull().default(0),
  lifetimePurchased: bigint("lifetime_purchased", { mode: "number" }).notNull().default(0),
  lifetimeConsumed: bigint("lifetime_consumed", { mode: "number" }).notNull().default(0),
  currency: text("currency").notNull().default("CREDIT"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const creditTransactions = pgTable(
  "credit_transactions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id").notNull(),
    direction: text("direction").notNull(),
    amount: bigint("amount", { mode: "number" }).notNull(),
    reason: text("reason").notNull(),
    relatedLedgerId: text("related_ledger_id"),
    paymentProvider: text("payment_provider"),
    paymentReference: text("payment_reference"),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    adminUserId: text("admin_user_id"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("credit_transactions_user_idx").on(table.userId),
    reasonIdx: index("credit_transactions_reason_idx").on(table.reason),
    createdIdx: index("credit_transactions_created_idx").on(table.createdAt),
  }),
);

/**
 * Universal usage ledger — every billable event lands here.
 * `service` is one of: ai_completion | ai_embedding | ai_image | whatsapp_message |
 * sms_message | email_batch | api_call | automation_run | webhook_delivery | ...
 *
 * Currency-safe: `unitCost`, `salePrice`, `margin` use numeric strings.
 */
export const usageLedger = pgTable(
  "usage_ledger",
  {
    id: text("id").primaryKey(),
    userId: text("user_id"),
    organizationId: text("organization_id"),
    apiKeyId: text("api_key_id"),
    projectId: text("project_id"),
    moduleId: text("module_id"),
    service: text("service").notNull(),
    quantity: numeric("quantity").notNull().default("0"),
    unit: text("unit").notNull().default("unit"),
    unitCost: numeric("unit_cost").notNull().default("0"),
    salePrice: numeric("sale_price").notNull().default("0"),
    margin: numeric("margin").notNull().default("0"),
    creditsConsumed: bigint("credits_consumed", { mode: "number" }).notNull().default(0),
    status: text("status").notNull().default("recorded"),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    occurredAt: timestamp("occurred_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("usage_ledger_user_idx").on(table.userId),
    serviceIdx: index("usage_ledger_service_idx").on(table.service),
    keyIdx: index("usage_ledger_key_idx").on(table.apiKeyId),
    occurredIdx: index("usage_ledger_occurred_idx").on(table.occurredAt),
  }),
);

/**
 * AI usage events — denormalized for fast analytics on AI resale.
 * Always recorded alongside a `usage_ledger` row.
 */
export const aiUsageEvents = pgTable(
  "ai_usage_events",
  {
    id: text("id").primaryKey(),
    userId: text("user_id"),
    apiKeyId: text("api_key_id"),
    ledgerId: text("ledger_id"),
    provider: text("provider").notNull(),
    model: text("model").notNull(),
    requestType: text("request_type").notNull(),
    tokensIn: integer("tokens_in").notNull().default(0),
    tokensOut: integer("tokens_out").notNull().default(0),
    tokensTotal: integer("tokens_total").notNull().default(0),
    estimatedCost: numeric("estimated_cost").notNull().default("0"),
    salePrice: numeric("sale_price").notNull().default("0"),
    margin: numeric("margin").notNull().default("0"),
    moduleId: text("module_id"),
    success: boolean("success").notNull().default(true),
    error: text("error"),
    metadata: jsonb("metadata").$type<Record<string, unknown> | null>(),
    occurredAt: timestamp("occurred_at").notNull().defaultNow(),
  },
  (table) => ({
    userIdx: index("ai_usage_user_idx").on(table.userId),
    providerIdx: index("ai_usage_provider_idx").on(table.provider),
    modelIdx: index("ai_usage_model_idx").on(table.model),
    occurredIdx: index("ai_usage_occurred_idx").on(table.occurredAt),
  }),
);
