# Conventions

| Aspect              | Rule                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| Module ids          | kebab-case (`api-center`, `dynamic-content`)                         |
| Folders             | kebab-case                                                           |
| Components          | `PascalCase.tsx`                                                     |
| Hooks               | `use-thing.ts`, default export named `useThing`                      |
| Services            | `services/<domain>.service.ts`, named functions `verbNoun`           |
| Server Actions      | `app/actions/<domain>.ts`, `"use server"` at top                     |
| DB tables           | `snake_case` plural (`users`, `audit_logs`)                          |
| Drizzle schema      | One file per logical group under `lib/db/schema/`                    |
| API routes          | `app/api/<resource>/route.ts` with verb-named exports                |
| Env vars            | `SCREAMING_SNAKE_CASE`, prefixed by integration (`STRIPE_*`)         |
| Permission keys     | dot.notation (`users.manage`, `content.edit`)                        |
| Status keys         | lowercase single word (`pending`, `published`)                       |
| Feature flag keys   | `dot.notation` (`module.ai`, `beta.ai_copilot`)                      |
| Routes (URLs)       | kebab-case                                                           |
| i18n keys           | dot.notation, namespaced (`landing.hero.title`)                      |
| UI strings          | always via `useTranslations()` / `getTranslations()`                 |
| Imports             | `@/lib/...`, `@/components/...`, `@/config/...` — no relative climbs |

## What NOT to do

- ❌ Hardcode UI strings.
- ❌ Import from `modules/*` in `lib/` or `services/core/`.
- ❌ Import from another module directly (cross only via public `index.ts`).
- ❌ Forget `audit()` on admin mutations.
- ❌ Log raw API secrets.
- ❌ Trust client-provided role/permissions — always re-check via
  `requireRole` / `requirePermission` on the server.
