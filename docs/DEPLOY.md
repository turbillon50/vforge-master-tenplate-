# Deploy

## Vercel

1. `pnpm install` locally to confirm the lockfile.
2. Create a Vercel project pointed at this repo + the deployment branch.
3. Set environment variables from `.env.example` in Vercel project settings.
4. Connect a Neon Postgres database; copy `DATABASE_URL` into Vercel envs.
5. Connect Clerk (publishable + secret key).
6. Push. Vercel runs `next build`.

## Database migrations

```bash
pnpm db:generate   # drizzle-kit: generate SQL from schema changes
pnpm db:push       # apply to the connected Postgres
pnpm db:seed       # optional: seed FAQs / legal / statuses
```

## PWA

- Manifest at `/manifest.webmanifest`
- Service worker at `/sw.js` (registered automatically in production)
- Icons under `/public/icons/`

## Domains (Name.com)

If you wired Name.com, run domain availability via `integrations/namecom`.

## Vercel deploy hooks

Configure deploy hooks in Vercel and trigger them via
`integrations/vercel/triggerDeployHook(url)`.
