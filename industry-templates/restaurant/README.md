# Restaurant template

Activates a menu-driven ordering app with kitchen, delivery and customer
flows. Use for a single venue or a chain.

- **UI archetype**: `operations` (map-friendly, fast updates)
- **Required integrations**: Clerk, Neon
- **Recommended integrations**: Stripe or Mercado Pago, Twilio (WhatsApp), Resend, Google Maps
- **Modules**: ecommerce, payments, communication, notifications, user-operations, analytics, dynamic-content

## Roles

owner · admin · kitchen · delivery · customer

## Order lifecycle

`received → preparing → ready → out_for_delivery → delivered`

Customer receives WhatsApp + email confirmation on each transition.

## To activate

```env
NEXT_PUBLIC_INDUSTRY="restaurant"
```

Then seed the menu via Admin → Content or import a CSV.
