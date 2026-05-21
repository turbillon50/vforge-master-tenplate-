# Webhook Center module

Inbound + outbound webhook hub.

- Inbound: validated endpoints under `/api/webhooks/*` (per integration)
- Outbound: register URL + secret to receive any platform event
- Retries with exponential backoff, dead-letter queue
- Per-tenant rate limits + delivery analytics
- Admin at `/admin/integrations` and `/admin/automations`
