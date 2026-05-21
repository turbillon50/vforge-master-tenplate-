/**
 * Integration registry — declares which third-party providers are wired in.
 * Each integration self-reports its `isConfigured` state by checking env vars.
 * Admin → Integrations Status uses this to render health.
 */

export type IntegrationId =
  | "clerk"
  | "neon"
  | "stripe"
  | "mercadopago"
  | "resend"
  | "twilio"
  | "google-maps"
  | "openrouter"
  | "namecom"
  | "vercel";

export interface IntegrationEntry {
  id: IntegrationId;
  name: string;
  category: "auth" | "database" | "payments" | "email" | "sms" | "maps" | "ai" | "domains" | "deployment";
  required: boolean;
  description: string;
  docsUrl: string;
  envVars: string[];
}

export const integrationsConfig: Record<IntegrationId, IntegrationEntry> = {
  clerk: {
    id: "clerk",
    name: "Clerk",
    category: "auth",
    required: true,
    description: "Authentication, user management and sessions.",
    docsUrl: "https://clerk.com/docs",
    envVars: ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"],
  },
  neon: {
    id: "neon",
    name: "Neon Postgres",
    category: "database",
    required: true,
    description: "Serverless Postgres database for application data.",
    docsUrl: "https://neon.tech/docs",
    envVars: ["DATABASE_URL"],
  },
  stripe: {
    id: "stripe",
    name: "Stripe",
    category: "payments",
    required: false,
    description: "Payments, subscriptions, billing portal.",
    docsUrl: "https://stripe.com/docs",
    envVars: ["STRIPE_SECRET_KEY", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"],
  },
  mercadopago: {
    id: "mercadopago",
    name: "Mercado Pago",
    category: "payments",
    required: false,
    description: "LATAM-native payments and subscriptions.",
    docsUrl: "https://www.mercadopago.com.mx/developers",
    envVars: ["MERCADOPAGO_ACCESS_TOKEN"],
  },
  resend: {
    id: "resend",
    name: "Resend",
    category: "email",
    required: false,
    description: "Transactional email with React Email templates.",
    docsUrl: "https://resend.com/docs",
    envVars: ["RESEND_API_KEY", "RESEND_FROM_EMAIL"],
  },
  twilio: {
    id: "twilio",
    name: "Twilio",
    category: "sms",
    required: false,
    description: "SMS and WhatsApp messaging.",
    docsUrl: "https://www.twilio.com/docs",
    envVars: ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_PHONE_NUMBER"],
  },
  "google-maps": {
    id: "google-maps",
    name: "Google Maps",
    category: "maps",
    required: false,
    description: "Maps, geocoding and routing.",
    docsUrl: "https://developers.google.com/maps",
    envVars: ["NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"],
  },
  openrouter: {
    id: "openrouter",
    name: "OpenRouter",
    category: "ai",
    required: false,
    description: "Unified gateway to Claude, GPT, Gemini, Llama and more.",
    docsUrl: "https://openrouter.ai/docs",
    envVars: ["OPENROUTER_API_KEY"],
  },
  namecom: {
    id: "namecom",
    name: "Name.com",
    category: "domains",
    required: false,
    description: "Domain availability check and registration.",
    docsUrl: "https://www.name.com/api-docs",
    envVars: ["NAMECOM_USERNAME", "NAMECOM_TOKEN"],
  },
  vercel: {
    id: "vercel",
    name: "Vercel",
    category: "deployment",
    required: false,
    description: "Deployment, preview environments and analytics.",
    docsUrl: "https://vercel.com/docs",
    envVars: ["VERCEL_TOKEN"],
  },
};

export function isIntegrationConfigured(id: IntegrationId): boolean {
  const entry = integrationsConfig[id];
  if (!entry) return false;
  return entry.envVars.every((key) => Boolean(process.env[key]));
}

export function getIntegrationStatus(id: IntegrationId): "ok" | "missing_env" | "error" {
  return isIntegrationConfigured(id) ? "ok" : "missing_env";
}
