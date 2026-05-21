# Industry Templates

Each subdirectory is a self-contained industry template. A template declares
**which modules to activate**, **which roles to seed**, **what dashboards
look like**, **which UI archetype to default to**, and **which integrations
are required vs optional**.

Templates are *configuration*. They do not duplicate business logic.
Modules continue to own their features; industry templates only orchestrate
which modules are turned on and how they are presented.

## Available templates

| Template               | Recommended archetype       | Status   |
| ---------------------- | --------------------------- | -------- |
| `restaurant`           | marketplace + operations    | scaffold |
| `real-estate`          | cinematic + fintech         | scaffold |
| `business-network`     | marketplace + messaging     | scaffold |
| `school`               | productivity + messaging    | scaffold |
| `security-inspections` | operations + productivity   | scaffold |

## Activating a template

Set the env var when generating a new client app:

```env
NEXT_PUBLIC_INDUSTRY="restaurant"
```

Or override at runtime from **Admin → Industry**.

## Adding a new industry

1. Create `industry-templates/<id>/config.ts` exporting an `IndustryTemplate`
2. Create `industry-templates/<id>/README.md` describing the use case
3. Register it in `config/industry.config.ts`
4. Add starter screens under `app/(app)/app/<id>/page.tsx` if the industry
   has a dedicated home, otherwise reuse the modular `/app` dashboard.
