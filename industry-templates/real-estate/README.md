# Real Estate template

Activates a cinematic listings experience with a CRM pipeline for brokers.

- **UI archetype**: `cinematic` (premium hero, big media, Airbnb-luxury feel)
- **Required integrations**: Clerk, Neon
- **Recommended integrations**: Google Maps, Twilio (WhatsApp), Resend, Stripe / Mercado Pago
- **Modules**: crm, communication, notifications, user-operations, analytics, dynamic-content, payments

## Roles

owner · admin · broker · client · investor

## Lead lifecycle

`new → contacted → qualified → visited → negotiating → won|lost`

WhatsApp + email follow-ups fire automatically on idle stages.

## To activate

```env
NEXT_PUBLIC_INDUSTRY="real-estate"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="..."
```
