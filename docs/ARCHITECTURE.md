# Architecture

VForge is a universal PWA application factory. It is **not** a single-purpose
app — it is reusable infrastructure for generating ecommerce, booking,
marketplace, rides, CRM, SaaS, fintech, and AI-powered applications.

## Stack

- **Framework**: Next.js 15 (App Router) + TypeScript (strict)
- **UI**: TailwindCSS + shadcn/ui (Radix primitives) + framer-motion
- **Auth**: Clerk
- **DB**: Neon Postgres + Drizzle ORM
- **i18n**: next-intl (EN / ES)
- **Theme**: next-themes (light / dark / system)
- **PWA**: webmanifest + service worker + bottom nav
- **Payments**: Stripe + Mercado Pago
- **Messaging**: Resend (email) + Twilio (SMS/WhatsApp) + Web Push
- **Maps**: Google Maps JS API
- **AI**: OpenRouter (OpenAI-compatible client → Claude / GPT / Gemini / …)

## Folder layout

```
/app             Next.js App Router (marketing, auth, app, admin)
/components      UI: ui/ primitives + composites (app-shell, admin, splash, …)
/modules         Vertical feature modules (isolated)
/integrations    Third-party adapters (lazy-init, env-driven)
/services        Business logic (server-only, no React)
/lib             Utilities: auth, db, audit, permissions, i18n, modules, ui-mode
/config          Centralized configuration (single source of truth)
/hooks           React hooks
/actions         Server Actions (thin wrappers calling services)
/docs            This folder
/prompts         Reusable prompts for AI codegen / agents
/scripts         CLI helpers (seed, check-env, bootstrap)
/ui-archetypes   Visual operating mode definitions
/public          Static assets, manifest, sw.js
```

## Layers

1. **Pages / route handlers** — thin. No business logic.
2. **Server Actions (`/actions`)** — input validation + service calls.
3. **Services (`/services`)** — business logic. Pure server. No React.
4. **Lib (`/lib`)** — infrastructure (db client, auth, audit, permissions).
5. **Integrations (`/integrations`)** — third-party adapters.
6. **Modules (`/modules`)** — vertical features.

## Enterprise foundations

- **Granular permissions**: 40+ atomic permission keys grouped into roles
  with per-user overrides.
- **Universal status system**: standardized state machine reusable across
  modules.
- **Feature flags**: defaults in code, overrides in DB, scoped to environment.
- **Audit log**: every admin mutation is logged with actor + before/after.
- **Media manager**: provider-agnostic, reusable across modules.
- **Communication Center**: role-aware multi-channel engine.
- **API Center**: API keys + prepaid credits + metered AI/API usage + ledger.
- **UI Archetype System**: 4 visual modes (fintech, cinematic, operations,
  productivity) swap layout/density/animation without changing core logic.

## Compliance

App Store / Play Store ready:
- `/delete-account` page with public form + admin inbox
- `/terms`, `/privacy`, `/cookies`, `/ios-policy`, `/android-policy`
- Cookie consent banner
- Consent checkboxes on sign-up
- App version + environment exposed in footer

## Clean separation

`lib/` and `services/core/` MUST NOT import from `modules/*`. Industry logic
belongs only inside modules. This keeps the core generic and reusable across
generated apps.
