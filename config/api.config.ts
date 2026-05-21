/**
 * API Center configuration — keys, scopes, rate limits, credit costs.
 */

export const API_KEY_SCOPES = {
  READ: "api.read",
  WRITE: "api.write",
  AI_COMPLETION: "ai.completion",
  AI_EMBEDDING: "ai.embedding",
  AI_IMAGE: "ai.image",
  MESSAGING_SEND: "messaging.send",
  WEBHOOK_DELIVERY: "webhook.delivery",
  AUTOMATION_RUN: "automation.run",
} as const;

export type ApiKeyScope = (typeof API_KEY_SCOPES)[keyof typeof API_KEY_SCOPES];

export const DEFAULT_RATE_LIMITS = {
  perMinute: 60,
  perHour: 1000,
  perDay: 10000,
} as const;

export const SERVICE_PRICING: Record<
  string,
  { unitCost: number; salePrice: number; unit: string; description: string }
> = {
  ai_completion: {
    unitCost: 0.000003,
    salePrice: 0.000006,
    unit: "token",
    description: "AI text completion (cost per token).",
  },
  ai_embedding: {
    unitCost: 0.0000001,
    salePrice: 0.0000002,
    unit: "token",
    description: "Embedding generation (cost per token).",
  },
  ai_image: {
    unitCost: 0.04,
    salePrice: 0.08,
    unit: "image",
    description: "AI image generation (cost per image).",
  },
  whatsapp_message: {
    unitCost: 0.005,
    salePrice: 0.01,
    unit: "message",
    description: "Outbound WhatsApp message.",
  },
  sms_message: {
    unitCost: 0.0075,
    salePrice: 0.02,
    unit: "message",
    description: "Outbound SMS message.",
  },
  email_batch: {
    unitCost: 0.0004,
    salePrice: 0.001,
    unit: "email",
    description: "Transactional email send.",
  },
  api_call: {
    unitCost: 0,
    salePrice: 0,
    unit: "call",
    description: "Generic API call (free, rate-limited).",
  },
  automation_run: {
    unitCost: 0.002,
    salePrice: 0.005,
    unit: "run",
    description: "Automation execution.",
  },
  webhook_delivery: {
    unitCost: 0,
    salePrice: 0,
    unit: "delivery",
    description: "Webhook delivery.",
  },
};

export const CREDIT_PACKS = [
  { id: "starter", credits: 1000, priceUSD: 10, label: "Starter" },
  { id: "growth", credits: 5500, priceUSD: 50, label: "Growth" },
  { id: "scale", credits: 12000, priceUSD: 100, label: "Scale" },
  { id: "enterprise", credits: 50000, priceUSD: 400, label: "Enterprise" },
] as const;

export const AI_PROVIDERS = [
  "openrouter",
  "openai",
  "anthropic",
  "perplexity",
  "google",
  "custom",
] as const;

export type AiProvider = (typeof AI_PROVIDERS)[number];
