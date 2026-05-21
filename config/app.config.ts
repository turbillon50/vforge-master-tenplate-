/**
 * Global application configuration.
 * Edit this file (or override via DB `app_settings`) to brand and configure
 * a new app generated from this template.
 */

export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME ?? "VForge",
  shortName: process.env.NEXT_PUBLIC_APP_NAME ?? "VForge",
  description:
    "Universal PWA application factory. Modular, multi-tenant, enterprise-grade template.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  env: (process.env.NEXT_PUBLIC_APP_ENV ?? "development") as
    | "development"
    | "staging"
    | "production",
  version: "0.1.0",

  // Defaults
  defaultLocale: (process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? "es") as "en" | "es",
  defaultTheme: (process.env.NEXT_PUBLIC_DEFAULT_THEME ?? "dark") as "light" | "dark" | "system",
  supportedLocales: ["en", "es"] as const,

  // Company / legal
  company: {
    name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Your Company",
    legalName:
      process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME ?? "Your Company, Inc.",
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@example.com",
    address: "",
    country: "MX",
    foundedYear: new Date().getFullYear(),
  },

  // PWA
  pwa: {
    backgroundColor: "#0a0a0f",
    themeColor: "#0a0a0f",
    display: "standalone" as const,
    orientation: "portrait" as const,
    startUrl: "/app",
    scope: "/",
  },
} as const;

export type AppConfig = typeof appConfig;
