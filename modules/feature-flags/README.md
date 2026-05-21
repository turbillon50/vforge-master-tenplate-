# Feature Flags module

Runtime feature switches. Toggle without deploys.

- Defaults declared in `config/feature-flags.config.ts`
- Per-tenant overrides persisted in DB
- Server-side helper: `isFeatureEnabled(flagKey)` from `lib/feature-flags.ts`
- Admin at `/admin/feature-flags`
- Controls industry templates, payments, AI, communication center, etc.
