# UI Archetypes

The **UI Archetype System** transforms the visual experience of the app without
changing core logic, modules, users, or data.

Switch archetypes with the cookie `vforge-archetype` or the admin UI at
`/admin/ui-mode`. The active archetype is exposed as `data-archetype="<key>"`
on `<html>` and as a set of CSS custom properties (see
`config/ui-mode.config.ts`).

## Modes

| Mode           | Inspired by                          | Best for                       |
| -------------- | ------------------------------------ | ------------------------------ |
| `fintech`      | Mercado Pago, Stripe, Revolut        | fintech, SaaS, CRM, admin      |
| `cinematic`    | Apple TV, Netflix, Airbnb Luxury     | tourism, luxury, real estate   |
| `operations`   | Uber, logistics, delivery            | logistics, delivery, rides     |
| `productivity` | Notion, Linear, Slack                | schools, enterprise, ops mgmt  |

## How it works

1. `config/ui-mode.config.ts` declares each archetype with **token overrides**
   (CSS variables) — radii, paddings, gaps, hero height, typography scale.
2. `lib/ui-mode.ts` reads the cookie and provides server helpers.
3. `app/layout.tsx` sets `data-archetype` on `<html>` and injects the tokens as
   inline `style` so they cascade across the whole app.
4. Components that want archetype-aware behavior can read the attribute via CSS
   selectors (e.g. `html[data-archetype="cinematic"] .hero { ... }`) or read
   the tokens directly.

## Adding a new archetype

1. Append a new key to the `UI_ARCHETYPES` constant.
2. Add a `UIArchetypeDefinition` entry to `uiModes`.
3. Document it under `ui-archetypes/<key>/README.md`.
4. (Optional) Override component behavior with `[data-archetype="<key>"]`
   selectors in CSS.
