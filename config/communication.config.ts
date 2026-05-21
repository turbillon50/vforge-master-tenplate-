/**
 * Universal Communication Center configuration.
 * The Communication Center is a multi-channel, role-aware engine that supports
 * announcements, conversations, transactional notifications, and automations
 * across in-app, email, SMS, WhatsApp and push channels.
 *
 * Channel adapters are modular and replaceable. Providers are NOT hardcoded
 * inside modules — only inside `/integrations/<provider>/` adapters.
 */

export const COMMUNICATION_CHANNELS = {
  IN_APP: "in_app",
  EMAIL: "resend_email",
  WHATSAPP: "twilio_whatsapp",
  SMS: "twilio_sms",
  PUSH: "pwa_push",
} as const;

export type CommunicationChannel =
  (typeof COMMUNICATION_CHANNELS)[keyof typeof COMMUNICATION_CHANNELS];

export const MESSAGE_TYPES = {
  DIRECT_MESSAGE: "direct_message",
  ANNOUNCEMENT: "announcement",
  SUPPORT_TICKET: "support_ticket",
  PAYMENT_REMINDER: "payment_reminder",
  EVENT_REMINDER: "event_reminder",
  EMERGENCY_NOTICE: "emergency_notice",
  SYSTEM_NOTIFICATION: "system_notification",
  MARKETING_CAMPAIGN: "marketing_campaign",
  DOCUMENT_REQUEST: "document_request",
} as const;

export type MessageType = (typeof MESSAGE_TYPES)[keyof typeof MESSAGE_TYPES];

export const MESSAGE_TYPE_DEFINITIONS: Record<
  MessageType,
  {
    key: MessageType;
    label: { en: string; es: string };
    defaultChannels: CommunicationChannel[];
    icon: string;
    priority: "low" | "normal" | "high" | "urgent";
  }
> = {
  direct_message: {
    key: "direct_message",
    label: { en: "Direct Message", es: "Mensaje Directo" },
    defaultChannels: ["in_app"],
    icon: "MessageCircle",
    priority: "normal",
  },
  announcement: {
    key: "announcement",
    label: { en: "Announcement", es: "Anuncio" },
    defaultChannels: ["in_app", "resend_email", "pwa_push"],
    icon: "Megaphone",
    priority: "high",
  },
  support_ticket: {
    key: "support_ticket",
    label: { en: "Support Ticket", es: "Ticket de Soporte" },
    defaultChannels: ["in_app", "resend_email"],
    icon: "LifeBuoy",
    priority: "normal",
  },
  payment_reminder: {
    key: "payment_reminder",
    label: { en: "Payment Reminder", es: "Recordatorio de Pago" },
    defaultChannels: ["in_app", "resend_email", "twilio_whatsapp"],
    icon: "CreditCard",
    priority: "high",
  },
  event_reminder: {
    key: "event_reminder",
    label: { en: "Event Reminder", es: "Recordatorio de Evento" },
    defaultChannels: ["in_app", "pwa_push", "twilio_whatsapp"],
    icon: "CalendarClock",
    priority: "normal",
  },
  emergency_notice: {
    key: "emergency_notice",
    label: { en: "Emergency Notice", es: "Aviso de Emergencia" },
    defaultChannels: ["in_app", "pwa_push", "twilio_sms", "twilio_whatsapp"],
    icon: "AlertTriangle",
    priority: "urgent",
  },
  system_notification: {
    key: "system_notification",
    label: { en: "System Notification", es: "Notificación del Sistema" },
    defaultChannels: ["in_app"],
    icon: "Settings",
    priority: "low",
  },
  marketing_campaign: {
    key: "marketing_campaign",
    label: { en: "Marketing Campaign", es: "Campaña de Marketing" },
    defaultChannels: ["resend_email", "pwa_push"],
    icon: "Sparkles",
    priority: "low",
  },
  document_request: {
    key: "document_request",
    label: { en: "Document Request", es: "Solicitud de Documento" },
    defaultChannels: ["in_app", "resend_email"],
    icon: "FileText",
    priority: "normal",
  },
};

export const RECIPIENT_FILTER_KEYS = [
  "role",
  "group",
  "status",
  "location",
  "module",
  "tag",
  "user_id",
  "email",
  "phone",
] as const;

export type RecipientFilterKey = (typeof RECIPIENT_FILTER_KEYS)[number];

export interface RecipientFilter {
  key: RecipientFilterKey;
  operator: "eq" | "in" | "ne" | "contains" | "starts_with";
  value: string | string[];
}

export const CHANNEL_LABELS: Record<CommunicationChannel, { en: string; es: string; icon: string }> = {
  in_app: { en: "In-App", es: "En la App", icon: "MessagesSquare" },
  resend_email: { en: "Email", es: "Email", icon: "Mail" },
  twilio_whatsapp: { en: "WhatsApp", es: "WhatsApp", icon: "MessageCircle" },
  twilio_sms: { en: "SMS", es: "SMS", icon: "Phone" },
  pwa_push: { en: "Push", es: "Push", icon: "Bell" },
};

export const DELIVERY_STATUSES = [
  "queued",
  "sending",
  "sent",
  "delivered",
  "read",
  "replied",
  "failed",
  "bounced",
  "skipped",
] as const;

export type DeliveryStatus = (typeof DELIVERY_STATUSES)[number];
