/**
 * Branding configuration — logo, palette, typography, motto.
 * Override at runtime via DB `app_settings.branding` (Admin → Branding).
 */

export const brandingConfig = {
  logo: {
    light: "/brand/logo-light.svg",
    dark: "/brand/logo-dark.svg",
    icon: "/brand/icon.svg",
    favicon: "/favicon.ico",
  },
  slogan: {
    en: "The universal application factory.",
    es: "La fábrica universal de aplicaciones.",
  },
  palette: {
    accent: "violet" as const,
    // Tailwind tokens are CSS variables, override in app/globals.css
  },
  typography: {
    headingFont: "Geist Sans",
    bodyFont: "Geist Sans",
    monoFont: "Geist Mono",
  },
  social: {
    twitter: "@vforge",
    github: "vforge",
  },
} as const;

export type BrandingConfig = typeof brandingConfig;
