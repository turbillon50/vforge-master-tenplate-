# School template

Activates a school management app: students, parents, teachers, groups,
attendance, announcements, calendar, payments and parent-teacher chat.

- **UI archetype**: `productivity` (Notion/Linear-style sidebar, structured)
- **Required integrations**: Clerk, Neon
- **Recommended integrations**: Twilio (WhatsApp + SMS for emergency), Resend, Stripe / Mercado Pago

## Roles

school_admin · director · teacher · parent · student · cashier

## Communication channels

In-app, email and WhatsApp — emergency notices also use SMS to maximize delivery.

## To activate

```env
NEXT_PUBLIC_INDUSTRY="school"
```
