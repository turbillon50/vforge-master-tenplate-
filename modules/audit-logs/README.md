# Audit Logs module

Append-only log of sensitive actions across the platform.

- Captures: logins, impersonation, role / permission changes, payment ops,
  integration key rotations, automation rule edits, admin config changes
- Schema lives in `lib/db/schema/audit.ts`
- Admin view at `/admin/audit-logs`
- Exportable via webhook for SIEM ingestion
