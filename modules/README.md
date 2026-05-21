# Modules

Each module is **vertical** (UI + services + schema scoped to one feature area)
and **isolated** — modules do not import from other modules directly.

## Anatomy

```
modules/<id>/
├── index.ts          → exports the Module contract (see lib/modules/module.ts)
├── routes/           → optional, mirrors app router segments
├── components/       → module-specific UI
├── services/         → module-specific business logic
├── schema.ts         → Drizzle schema (lifted to lib/db/schema)
└── README.md
```

## Enable / disable

Toggle via `config/modules.config.ts` (default state) or via Admin → Modules
(runtime override stored in `module_settings`).

## Add a new module

1. Append the id to `ModuleId` in `config/modules.config.ts`.
2. Add the registry entry (name, description, icon, navItems, permissions).
3. Create `modules/<id>/` with an `index.ts`, README, and any schema/services.
4. Add app pages under `app/(app)/app/<route>/page.tsx`.
5. (Optional) Add admin pages under `app/(admin)/admin/<route>/page.tsx`.

## Core vs. industry

- **Core** modules ship inside `lib/` and `services/core/` and never import
  from `modules/`. They include: auth, dashboard, permissions, analytics,
  notifications, settings, admin, layouts, integrations.
- **Industry** modules (ecommerce, booking, marketplace, rides, etc.) live
  here and may freely use core modules + integrations.
