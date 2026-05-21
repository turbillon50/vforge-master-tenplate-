# Authoring a module

A module is a vertical feature (ecommerce, booking, marketplace, …) with
its own UI, services, and (optionally) DB schema.

## 1. Declare it in the registry

Edit `config/modules.config.ts`:

```ts
"my-module": {
  id: "my-module",
  enabled: true,
  category: "industry",            // core | industry | growth | ai
  name: { en: "My module", es: "Mi módulo" },
  description: { en: "…", es: "…" },
  icon: "Sparkles",                // lucide-react icon name
  routes: ["/app/my-module"],
  navItems: [{ label: { en: "My module", es: "Mi módulo" }, href: "/app/my-module", icon: "Sparkles" }],
  permissions: [],
},
```

Also add the id to the `ModuleId` union.

## 2. Create the folder

```
modules/my-module/
├── index.ts        // export the Module contract
├── components/
├── services/
└── README.md
```

## 3. Add UI pages

User pages: `app/(app)/app/my-module/page.tsx`
Admin pages (optional): `app/(admin)/admin/my-module/page.tsx`

## 4. Add DB schema

If you need new tables, add them at `lib/db/schema/my-module.ts` and re-export
from `lib/db/schema/index.ts`. Keep cross-module reads happy by lifting schema
to `lib/db/schema/` rather than nesting deeply.

## 5. Permissions

Declare any new permission keys in `config/permissions.config.ts` and assign
them in the role catalog.

## 6. Audit

Every mutation should call `audit({ action: "myModule.xxx.created", target… })`.

## 7. Translate

Every UI string comes from `useTranslations()`. Add namespaces under
`i18n/en.json` and `i18n/es.json`.
