# AGENTS.md — Guide for AI agents

This repository is designed to be extended partially or fully by AI agents
(Claude Code, Cursor, OpenAI Codex, and cloud agents).

## Where to edit what

| If you want to…                          | Edit / create…                                |
| ---------------------------------------- | --------------------------------------------- |
| Add a new module                         | `config/modules.config.ts` + `modules/<id>/`  |
| Add a permission                         | `config/permissions.config.ts`                |
| Add a role                               | `config/roles.config.ts`                      |
| Toggle a runtime flag                    | `config/feature-flags.config.ts` or DB        |
| Add a status                             | `config/statuses.config.ts`                   |
| Add a legal page                         | `config/legal.config.ts` + defaults file      |
| Add a social platform                    | `config/social.config.ts`                     |
| Change branding                          | `config/branding.config.ts` + Admin → Branding|
| Add an integration                       | `integrations/<provider>/`                    |
| Add app navigation                       | Module's `navItems` in `modules.config.ts`    |
| Add admin navigation                     | `components/admin/AdminSideNav.tsx`           |
| Add a new UI archetype                   | `config/ui-mode.config.ts` + `ui-archetypes/`  |
| Add a public page                        | `app/(marketing)/<slug>/page.tsx`             |
| Add an authenticated user page           | `app/(app)/app/<slug>/page.tsx`               |
| Add an admin page                        | `app/(admin)/admin/<slug>/page.tsx`           |

## Conventions

- **Modules**: kebab-case ids (`api-center`, not `apiCenter`). Folder per id.
- **Routes**: kebab-case. App pages live under `(app)/app/...`, admin pages
  under `(admin)/admin/...`, public under `(marketing)/...`.
- **Components**: `PascalCase.tsx` in kebab-case folders.
- **Services**: `services/<domain>.service.ts`, named exports.
- **DB tables**: `snake_case` plural.
- **Env vars**: `SCREAMING_SNAKE_CASE`, prefixed by integration (`STRIPE_*`).
- **i18n**: every UI string comes from `useTranslations()` — never hardcode.

## Hard rules

- `lib/` and `services/core/` MUST NOT import from `modules/*`.
- Modules MUST NOT import from other modules directly. Use public APIs
  exported from `modules/<id>/index.ts`.
- Every admin mutation MUST call `audit({ action, target, before, after })`.
- Every UI string MUST come from `useTranslations()`.
- API key secrets are shown ONCE at creation. Never log them.
