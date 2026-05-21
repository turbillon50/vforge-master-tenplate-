# VForge — Universal PWA Application Factory

> Idea → Module selection → Branding → Deploy.

VForge is a **reusable foundation** for generating premium applications
(ecommerce, marketplaces, booking, rides, CRM, SaaS, fintech, AI-powered apps,
etc.) from a single codebase. It is not a single-purpose product — it is the
infrastructure that produces products.

## What's in the box

- **Next.js 15 (App Router)** + TypeScript strict + TailwindCSS + shadcn/ui
- **Clerk** auth · **Neon** Postgres + **Drizzle** ORM
- **Stripe** + **Mercado Pago** payments · **Resend** email · **Twilio** SMS/WhatsApp
- **Google Maps** · **OpenRouter** AI gateway · **Name.com** domains
- **PWA** (manifest + service worker + bottom nav + offline-ready)
- **i18n** EN/ES with toggle · **Theme** light/dark with toggle
- **UI Archetype System**: fintech, cinematic, operations, productivity, marketplace, messaging
- **Industry Templates**: restaurant, real-estate, business-network, school, security-inspections
- Multi-page public site (17 routes incl. /knowledge /press /status /splash) ready for App Store / Play Store
- 25+ modules (industry + core + ops + growth) with config-driven enable/disable
- Granular permissions (40+ keys, 6 roles, per-user overrides)
- Universal status system, feature flags, audit logs, media manager
- Communication Center (in-app, email, SMS, WhatsApp, push)
- API Center with prepaid credits, metered AI/API usage, resale-ready ledger

## Quickstart

```bash
pnpm install
cp .env.example .env.local      # fill what you need; only Clerk + Neon required
pnpm db:generate && pnpm db:push
pnpm db:seed                    # optional: seed FAQs, legal, social
pnpm dev
```

Then open http://localhost:3000.

## Scripts

| Script              | Description                                |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | Run Next.js dev server                     |
| `pnpm build`        | Production build                           |
| `pnpm start`        | Run the production build                   |
| `pnpm lint`         | Lint via Next/ESLint                       |
| `pnpm typecheck`    | `tsc --noEmit`                             |
| `pnpm db:generate`  | Generate Drizzle migrations from schema    |
| `pnpm db:push`      | Push schema to the database                |
| `pnpm db:studio`    | Open Drizzle Studio                        |
| `pnpm db:seed`      | Seed FAQs, legal pages, social platforms   |
| `pnpm check:env`    | Validate .env against .env.example         |

## Public routes

`/`, `/splash`, `/about`, `/features`, `/pricing`, `/faq`, `/contact`,
`/support`, `/status`, `/press`, `/knowledge`, `/terms`, `/privacy`,
`/cookies`, `/delete-account`, `/ios-policy`, `/android-policy`

## Private routes (PWA shell)

- `/app` — dashboard, bottom nav, modules
- `/app/profile`, `/app/settings`, `/app/notifications`, `/app/billing`, `/app/help`
- `/app/inbox` (Communication Center), `/app/api` (API Center)
- Module surfaces: `/app/{ecommerce,booking,marketplace,rides,crm,analytics,...}`
- `/dashboard/*` paths are URL aliases that resolve to `/app/*`

## Admin routes

- `/admin` — overview · users · roles · permissions · feature-flags · statuses
- `/admin/content` · `knowledge` · `legal` · `press` · `faq` · `social-links` · `media`
- `/admin/communication` · `notifications` · `automations` · `support`
- `/admin/analytics` · `payments` · `api-keys` · `credits` · `usage`
- `/admin/modules` · `industry` · `ui-mode` · `integrations` · `branding` · `settings`
- `/admin/audit-logs`

## Industry templates

| Template               | Recommended archetype       | Status   |
| ---------------------- | --------------------------- | -------- |
| `restaurant`           | operations / marketplace    | scaffold |
| `real-estate`          | cinematic                   | scaffold |
| `business-network`     | marketplace / messaging     | scaffold |
| `school`               | productivity / messaging    | scaffold |
| `security-inspections` | operations                  | scaffold |

Activate one with `NEXT_PUBLIC_INDUSTRY="<id>"`. See
[`industry-templates/README.md`](./industry-templates/README.md).

## Documentation

- `docs/ARCHITECTURE.md` — what's where and why
- `docs/MODULES.md` — how to add a new module
- `docs/AGENTS.md` — guide for AI agents extending the repo
- `docs/CONVENTIONS.md` — naming, layering, hard rules
- `docs/DEPLOY.md` — deploying to Vercel + Neon
- `ui-archetypes/README.md` — the visual modes system
- `industry-templates/README.md` — industry templates registry

## Brand

This template ships dark-first with a cinematic, premium aesthetic. Override
branding (logo, palette, typography, slogan) from Admin → Branding without
touching code.

## License

MIT (or whatever you set in `package.json`).