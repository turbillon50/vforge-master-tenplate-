# Automation Engine module

Event-driven workflow runner. "When X happens, do Y."

- Triggers: any platform event (`order.created`, `lead.idle_24h`, `payment.failed`, …)
- Actions: send WhatsApp / email / SMS / push / webhook / AI run
- Conditional branches, delays, retry policy
- Per-tenant rule library editable at `/admin/automations`
- Execution telemetry visible in Usage + Audit Logs
