import type { IndustryTemplate } from "@/config/industry.config";

export const realEstateTemplate: IndustryTemplate = {
  id: "real-estate",
  name: { en: "Real Estate", es: "Real Estate" },
  tagline: {
    en: "Listings, leads, brokers and a CRM pipeline — cinematic by default.",
    es: "Listings, leads, brokers y pipeline CRM — cinemático por default.",
  },
  description: {
    en: "Property listings with rich media, lead capture, broker workflow, appointment scheduling, document handling and WhatsApp follow-up.",
    es: "Listings de propiedades con multimedia, captura de leads, flujo de brokers, citas, documentos y follow-up por WhatsApp.",
  },
  icon: "Building2",
  recommendedArchetype: "cinematic",
  modules: [
    "crm",
    "communication",
    "notifications",
    "user-operations",
    "analytics",
    "dynamic-content",
    "payments",
  ],
  roles: [
    {
      key: "owner",
      label: { en: "Owner", es: "Dueño" },
      description: { en: "Agency owner.", es: "Propietario de la agencia." },
    },
    {
      key: "admin",
      label: { en: "Office admin", es: "Admin de oficina" },
      description: { en: "Manages staff, listings and CRM.", es: "Gestiona personal, listings y CRM." },
    },
    {
      key: "broker",
      label: { en: "Broker", es: "Broker" },
      description: { en: "Owns listings and leads.", es: "Dueño de listings y leads." },
    },
    {
      key: "client",
      label: { en: "Client", es: "Cliente" },
      description: { en: "Browses listings, books visits, signs documents.", es: "Explora listings, agenda visitas, firma documentos." },
    },
    {
      key: "investor",
      label: { en: "Investor", es: "Inversionista" },
      description: { en: "Tracks portfolio and ROI.", es: "Da seguimiento al portafolio y ROI." },
    },
  ],
  dashboardSections: [
    { key: "listings", label: { en: "Listings", es: "Propiedades" }, href: "/app/marketplace", icon: "Building2" },
    { key: "leads", label: { en: "Leads", es: "Leads" }, href: "/app/crm", icon: "Users" },
    { key: "appointments", label: { en: "Visits", es: "Visitas" }, href: "/app/booking", icon: "CalendarCheck" },
    { key: "inbox", label: { en: "Messages", es: "Mensajes" }, href: "/app/inbox", icon: "MessagesSquare" },
  ],
  adminSections: [
    { key: "properties", label: { en: "Properties", es: "Propiedades" }, href: "/admin/content", icon: "Building2" },
    { key: "brokers", label: { en: "Brokers", es: "Brokers" }, href: "/admin/users", icon: "Users" },
    { key: "leads", label: { en: "Pipeline", es: "Pipeline" }, href: "/admin/integrations", icon: "ChartLine" },
    { key: "comms", label: { en: "WhatsApp follow-up", es: "WhatsApp follow-up" }, href: "/admin/communication", icon: "MessagesSquare" },
  ],
  dataModels: [
    {
      name: "Property",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "title", type: "string", required: true },
        { name: "description", type: "text" },
        { name: "type", type: "enum:apartment|house|land|commercial|office" },
        { name: "operation", type: "enum:sale|rent" },
        { name: "price", type: "decimal", required: true },
        { name: "currency", type: "string", required: true },
        { name: "address", type: "string" },
        { name: "lat", type: "decimal" },
        { name: "lng", type: "decimal" },
        { name: "bedrooms", type: "int" },
        { name: "bathrooms", type: "int" },
        { name: "areaM2", type: "decimal" },
        { name: "status", type: "enum:draft|published|reserved|sold|rented" },
        { name: "brokerId", type: "uuid" },
        { name: "media", type: "json" },
      ],
    },
    {
      name: "Lead",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "propertyId", type: "uuid" },
        { name: "name", type: "string", required: true },
        { name: "phone", type: "string" },
        { name: "email", type: "string" },
        { name: "source", type: "string" },
        { name: "stage", type: "enum:new|contacted|qualified|visited|negotiating|won|lost", required: true },
        { name: "assignedTo", type: "uuid" },
      ],
    },
    {
      name: "Appointment",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "propertyId", type: "uuid", required: true },
        { name: "leadId", type: "uuid", required: true },
        { name: "brokerId", type: "uuid", required: true },
        { name: "startsAt", type: "timestamp", required: true },
        { name: "status", type: "enum:scheduled|confirmed|completed|no_show|cancelled" },
      ],
    },
  ],
  communicationFlows: [
    {
      id: "lead-capture",
      label: { en: "Lead capture", es: "Captura de lead" },
      steps: ["form.submitted", "lead.created", "broker.assigned", "whatsapp.greet"],
    },
    {
      id: "appointment-confirmation",
      label: { en: "Appointment confirmation", es: "Confirmación de cita" },
      steps: ["appointment.created", "whatsapp.send_confirmation", "email.send_calendar_invite"],
    },
    {
      id: "follow-up-cadence",
      label: { en: "Follow-up cadence", es: "Cadencia de follow-up" },
      steps: ["lead.idle_24h", "whatsapp.nudge", "lead.idle_72h", "broker.alerted"],
    },
  ],
  paymentFlows: [
    {
      id: "reservation",
      label: { en: "Reservation deposit", es: "Depósito de reserva" },
      steps: ["client.accepts_offer", "payment.deposit", "property.status=reserved"],
    },
  ],
  notificationFlows: [
    {
      id: "new-lead-alert",
      label: { en: "New lead alert", es: "Alerta de nuevo lead" },
      steps: ["lead.created", "broker.push_notification"],
    },
  ],
  requiredIntegrations: ["clerk", "neon"],
  optionalIntegrations: ["stripe", "mercadopago", "twilio", "resend", "google-maps"],
};
