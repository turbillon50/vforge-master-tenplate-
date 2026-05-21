# Communication module

Universal multi-channel engine. Not just chat — a role-aware, segmented,
scheduled message router.

## Sub-areas

- `inbox/` — user-facing inbox
- `conversations/` — threaded DMs and support
- `announcements/` — admin broadcasts
- `templates/` — reusable message templates with variables
- `recipients/` — filtering by role/group/status/location/module/tag
- `channels/` — adapter selection per channel
- `automations/` — event-triggered rules
- `read-receipts/` — sent → delivered → read → replied
- `support/` — incoming threads from /contact and /support

## Channels

`in_app`, `resend_email`, `twilio_whatsapp`, `twilio_sms`, `pwa_push`.
Adapters live under `/integrations/<provider>/`. Resolution goes through
`services/channel-router.service.ts`.

## Message types

`direct_message`, `announcement`, `support_ticket`, `payment_reminder`,
`event_reminder`, `emergency_notice`, `system_notification`,
`marketing_campaign`, `document_request`.

## Tracking

Per delivery row: `queued → sending → sent → delivered → read → replied`,
plus `failed`, `bounced`, `skipped`.
