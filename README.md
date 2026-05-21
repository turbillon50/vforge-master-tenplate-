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
- **UI Archetype System**: fintech, cinematic, operations, productivity
- Multi-page public site (13 routes) ready for App Store / Play Store
- 16 modules (12 industry + 4 core) with config-driven enable/disable
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

`/`, `/about`, `/features`, `/pricing`, `/faq`, `/contact`, `/support`,
`/terms`, `/privacy`, `/cookies`, `/delete-account`, `/ios-policy`,
`/android-policy`

## Private routes

- `/app` — PWA shell with bottom nav, modules, profile, inbox, api
- `/admin` — enterprise admin dashboard (20+ pages)

## Documentation

- `docs/ARCHITECTURE.md` — what's where and why
- `docs/MODULES.md` — how to add a new module
- `docs/AGENTS.md` — guide for AI agents extending the repo
- `docs/CONVENTIONS.md` — naming, layering, hard rules
- `docs/DEPLOY.md` — deploying to Vercel + Neon
- `ui-archetypes/README.md` — the visual modes system

## Brand

This template ships dark-first with a cinematic, premium aesthetic. Override
branding (logo, palette, typography, slogan) from Admin → Branding without
touching code.

## License

MIT (or whatever you set in `package.json`).