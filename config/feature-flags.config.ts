/**
 * Default feature flags — overridable at runtime via DB `feature_flags`.
 * Use `isFeatureEnabled(key)` from `lib/feature-flags.ts`.
 */

export const FEATURE_FLAGS = {
  // Modules toggles (mirror modules.config but allow finer control)
  MODULE_ECOMMERCE: "module.ecommerce",
  MODULE_BOOKING: "module.booking",
  MODULE_MARKETPLACE: "module.marketplace",
  MODULE_RIDES: "module.rides",
  MODULE_CRM: "module.crm",
  MODULE_ANALYTICS: "module.analytics",
  MODULE_PAYMENTS: "module.payments",
  MODULE_NOTIFICATIONS: "module.notifications",
  MODULE_AI: "module.ai",
  MODULE_WALLET: "module.wallet",
  MODULE_SUBSCRIPTIONS: "module.subscriptions",

  // Integrations
  INTEGRATION_STRIPE: "integration.stripe",
  INTEGRATION_MERCADOPAGO: "integration.mercadopago",
  INTEGRATION_RESEND: "integration.resend",
  INTEGRATION_TWILIO: "integration.twilio",
  INTEGRATION_GOOGLE_MAPS: "integration.google_maps",
  INTEGRATION_OPENROUTER: "integration.openrouter",

  // Beta / experimental
  BETA_AI_COPILOT: "beta.ai_copilot",
  BETA_VOICE_INPUT: "beta.voice_input",
  BETA_MEDIA_AI: "beta.media_ai",

  // Notifications channels
  NOTIFY_EMAIL: "notify.email",
  NOTIFY_SMS: "notify.sms",
  NOTIFY_WHATSAPP: "notify.whatsapp",
  NOTIFY_PUSH: "notify.push",

  // Wallet
  WALLET_TRANSFERS: "wallet.transfers",
  WALLET_PAYOUTS: "wallet.payouts",

  // Analytics
  ANALYTICS_REALTIME: "analytics.realtime",
  ANALYTICS_EXPORT: "analytics.export",

  // Admin tools
  ADMIN_IMPERSONATE: "admin.impersonate",
  ADMIN_BULK_ACTIONS: "admin.bulk_actions",
  ADMIN_DATA_EXPORT: "admin.data_export",

  // Maintenance
  MAINTENANCE_MODE: "maintenance_mode",
  SIGNUPS_DISABLED: "signups_disabled",
} as const;

export type FeatureFlagKey = (typeof FEATURE_FLAGS)[keyof typeof FEATURE_FLAGS];

export interface FeatureFlagDefinition {
  key: FeatureFlagKey;
  defaultEnabled: boolean;
  description: string;
  category: "module" | "integration" | "beta" | "channel" | "admin" | "system";
}

export const featureFlagDefaults: FeatureFlagDefinition[] = [
  { key: FEATURE_FLAGS.MODULE_ECOMMERCE, defaultEnabled: true, description: "E-commerce module", category: "module" },
  { key: FEATURE_FLAGS.MODULE_BOOKING, defaultEnabled: true, description: "Booking module", category: "module" },
  { key: FEATURE_FLAGS.MODULE_MARKETPLACE, defaultEnabled: true, description: "Marketplace module", category: "module" },
  { key: FEATURE_FLAGS.MODULE_RIDES, defaultEnabled: true, description: "Rides module", category: "module" },
  { key: FEATURE_FLAGS.MODULE_CRM, defaultEnabled: true, description: "CRM module", category: "module" },
  { key: FEATURE_FLAGS.MODULE_ANALYTICS, defaultEnabled: true, description: "Analytics module", category: "module" },
  { key: FEATURE_FLAGS.MODULE_PAYMENTS, defaultEnabled: true, description: "Payments module", category: "module" },
  { key: FEATURE_FLAGS.MODULE_NOTIFICATIONS, defaultEnabled: true, description: "Notifications module", category: "module" },
  { key: FEATURE_FLAGS.MODULE_AI, defaultEnabled: true, description: "AI Copilot module", category: "module" },
  { key: FEATURE_FLAGS.MODULE_WALLET, defaultEnabled: true, description: "Wallet module", category: "module" },
  { key: FEATURE_FLAGS.MODULE_SUBSCRIPTIONS, defaultEnabled: true, description: "Subscriptions module", category: "module" },
  { key: FEATURE_FLAGS.INTEGRATION_STRIPE, defaultEnabled: true, description: "Stripe integration", category: "integration" },
  { key: FEATURE_FLAGS.INTEGRATION_MERCADOPAGO, defaultEnabled: true, description: "Mercado Pago integration", category: "integration" },
  { key: FEATURE_FLAGS.INTEGRATION_RESEND, defaultEnabled: true, description: "Resend (email) integration", category: "integration" },
  { key: FEATURE_FLAGS.INTEGRATION_TWILIO, defaultEnabled: true, description: "Twilio integration", category: "integration" },
  { key: FEATURE_FLAGS.INTEGRATION_GOOGLE_MAPS, defaultEnabled: true, description: "Google Maps integration", category: "integration" },
  { key: FEATURE_FLAGS.INTEGRATION_OPENROUTER, defaultEnabled: true, description: "OpenRouter (AI) integration", category: "integration" },
  { key: FEATURE_FLAGS.BETA_AI_COPILOT, defaultEnabled: false, description: "AI Copilot beta features", category: "beta" },
  { key: FEATURE_FLAGS.BETA_VOICE_INPUT, defaultEnabled: false, description: "Voice input beta", category: "beta" },
  { key: FEATURE_FLAGS.BETA_MEDIA_AI, defaultEnabled: false, description: "AI media generation beta", category: "beta" },
  { key: FEATURE_FLAGS.NOTIFY_EMAIL, defaultEnabled: true, description: "Email notifications", category: "channel" },
  { key: FEATURE_FLAGS.NOTIFY_SMS, defaultEnabled: false, description: "SMS notifications", category: "channel" },
  { key: FEATURE_FLAGS.NOTIFY_WHATSAPP, defaultEnabled: false, description: "WhatsApp notifications", category: "channel" },
  { key: FEATURE_FLAGS.NOTIFY_PUSH, defaultEnabled: true, description: "Push notifications", category: "channel" },
  { key: FEATURE_FLAGS.WALLET_TRANSFERS, defaultEnabled: false, description: "User-to-user wallet transfers", category: "module" },
  { key: FEATURE_FLAGS.WALLET_PAYOUTS, defaultEnabled: false, description: "Wallet payouts to bank", category: "module" },
  { key: FEATURE_FLAGS.ANALYTICS_REALTIME, defaultEnabled: false, description: "Realtime analytics dashboard", category: "module" },
  { key: FEATURE_FLAGS.ANALYTICS_EXPORT, defaultEnabled: true, description: "Analytics CSV export", category: "module" },
  { key: FEATURE_FLAGS.ADMIN_IMPERSONATE, defaultEnabled: false, description: "Admin user impersonation", category: "admin" },
  { key: FEATURE_FLAGS.ADMIN_BULK_ACTIONS, defaultEnabled: true, description: "Bulk actions in admin lists", category: "admin" },
  { key: FEATURE_FLAGS.ADMIN_DATA_EXPORT, defaultEnabled: true, description: "Admin data export", category: "admin" },
  { key: FEATURE_FLAGS.MAINTENANCE_MODE, defaultEnabled: false, description: "Show maintenance page", category: "system" },
  { key: FEATURE_FLAGS.SIGNUPS_DISABLED, defaultEnabled: false, description: "Disable new user signups", category: "system" },
];

export const defaultFlagMap: Record<FeatureFlagKey, boolean> = Object.fromEntries(
  featureFlagDefaults.map((f) => [f.key, f.defaultEnabled]),
) as Record<FeatureFlagKey, boolean>;
