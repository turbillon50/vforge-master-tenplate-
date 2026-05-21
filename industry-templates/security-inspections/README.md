# Security Inspections template

Activates a field-ops app for security companies: rounds, checklists,
evidence, incident reports and client-facing reports.

- **UI archetype**: `operations` (map-first, bottom-sheet, snappy)
- **Required integrations**: Clerk, Neon
- **Recommended integrations**: Twilio (WhatsApp + SMS), Resend, Google Maps

## Roles

security_admin · supervisor · guard · client · auditor

## Inspection lifecycle

`in_progress → submitted → approved | rejected`

Incidents escalate to supervisor instantly when marked `critical`.

## To activate

```env
NEXT_PUBLIC_INDUSTRY="security-inspections"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="..."
```
