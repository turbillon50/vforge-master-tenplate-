# Business Network template

Activates a Tortillap-style local business network: directory, memberships,
referrals, internal messaging, promotions and community feed shell.

- **UI archetype**: `marketplace` (browseable, social, promotional)
- **Required integrations**: Clerk, Neon
- **Recommended integrations**: Twilio (WhatsApp), Resend, Google Maps, Stripe / Mercado Pago

## Roles

network_admin · business_owner · member · guest

## Business lifecycle

`pending → approved → suspended | rejected`

Only admin-approved businesses appear in the public directory.

## To activate

```env
NEXT_PUBLIC_INDUSTRY="business-network"
```
