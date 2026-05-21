import type { IndustryTemplate } from "@/config/industry.config";

export const securityInspectionsTemplate: IndustryTemplate = {
  id: "security-inspections",
  name: { en: "Security Inspections", es: "Inspecciones de Seguridad" },
  tagline: {
    en: "Field guards, checklists, evidence and supervisor review.",
    es: "Guardias en campo, checklists, evidencias y revisión del supervisor.",
  },
  description: {
    en: "Operations app for security companies: guard check-in/out, inspection rounds, checklists, photo evidence, location capture, incident reports and client-facing reports.",
    es: "App de operación para empresas de seguridad: check-in/out de guardias, rondas, checklists, evidencias con foto, captura de ubicación, reporte de incidentes y reportes para el cliente.",
  },
  icon: "ShieldCheck",
  recommendedArchetype: "operations",
  modules: [
    "communication",
    "notifications",
    "user-operations",
    "analytics",
    "dynamic-content",
    "crm",
  ],
  roles: [
    {
      key: "security_admin",
      label: { en: "Security admin", es: "Admin de seguridad" },
      description: { en: "Runs the company.", es: "Gestiona la empresa." },
    },
    {
      key: "supervisor",
      label: { en: "Supervisor", es: "Supervisor" },
      description: { en: "Reviews rounds, approves incident reports.", es: "Revisa rondas, aprueba reportes de incidentes." },
    },
    {
      key: "guard",
      label: { en: "Guard", es: "Guardia" },
      description: { en: "Runs inspections, uploads evidence.", es: "Realiza inspecciones, sube evidencias." },
    },
    {
      key: "client",
      label: { en: "Client", es: "Cliente" },
      description: { en: "Receives reports.", es: "Recibe reportes." },
    },
    {
      key: "auditor",
      label: { en: "Auditor", es: "Auditor" },
      description: { en: "Read-only access for compliance audits.", es: "Acceso de solo lectura para auditorías." },
    },
  ],
  dashboardSections: [
    { key: "rounds", label: { en: "Today's rounds", es: "Rondas de hoy" }, href: "/app", icon: "ClipboardList" },
    { key: "incidents", label: { en: "Incidents", es: "Incidentes" }, href: "/app/inbox", icon: "AlertTriangle" },
    { key: "profile", label: { en: "Profile", es: "Perfil" }, href: "/app/profile", icon: "UserCog" },
  ],
  adminSections: [
    { key: "guards", label: { en: "Guards", es: "Guardias" }, href: "/admin/users", icon: "UserCheck" },
    { key: "sites", label: { en: "Sites", es: "Sitios" }, href: "/admin/content", icon: "MapPin" },
    { key: "checklists", label: { en: "Checklists", es: "Checklists" }, href: "/admin/content", icon: "ListChecks" },
    { key: "reports", label: { en: "Client reports", es: "Reportes a clientes" }, href: "/admin/communication", icon: "FileText" },
  ],
  dataModels: [
    {
      name: "Site",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "clientId", type: "uuid", required: true },
        { name: "name", type: "string", required: true },
        { name: "address", type: "string" },
        { name: "lat", type: "decimal" },
        { name: "lng", type: "decimal" },
      ],
    },
    {
      name: "Checklist",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "siteId", type: "uuid", required: true },
        { name: "name", type: "string", required: true },
        { name: "items", type: "json", required: true },
      ],
    },
    {
      name: "Inspection",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "siteId", type: "uuid", required: true },
        { name: "guardId", type: "uuid", required: true },
        { name: "checklistId", type: "uuid", required: true },
        { name: "startedAt", type: "timestamp", required: true },
        { name: "completedAt", type: "timestamp" },
        { name: "answers", type: "json" },
        { name: "evidence", type: "json" },
        { name: "lat", type: "decimal" },
        { name: "lng", type: "decimal" },
        { name: "status", type: "enum:in_progress|submitted|approved|rejected" },
      ],
    },
    {
      name: "Incident",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "siteId", type: "uuid", required: true },
        { name: "guardId", type: "uuid", required: true },
        { name: "title", type: "string", required: true },
        { name: "description", type: "text" },
        { name: "severity", type: "enum:low|medium|high|critical", required: true },
        { name: "evidence", type: "json" },
        { name: "occurredAt", type: "timestamp", required: true },
        { name: "status", type: "enum:open|under_review|closed" },
      ],
    },
    {
      name: "GuardShift",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "guardId", type: "uuid", required: true },
        { name: "siteId", type: "uuid", required: true },
        { name: "checkIn", type: "timestamp" },
        { name: "checkOut", type: "timestamp" },
      ],
    },
  ],
  communicationFlows: [
    {
      id: "shift-check-in",
      label: { en: "Shift check-in", es: "Check-in de turno" },
      steps: ["guard.checks_in", "supervisor.notified"],
    },
    {
      id: "incident-escalation",
      label: { en: "Incident escalation", es: "Escalación de incidente" },
      steps: ["guard.creates_incident", "supervisor.alerted", "client.report_emailed"],
    },
    {
      id: "client-report",
      label: { en: "Client report", es: "Reporte para el cliente" },
      steps: ["supervisor.approves", "pdf.generated", "email.send"],
    },
  ],
  paymentFlows: [
    {
      id: "client-billing",
      label: { en: "Client billing", es: "Facturación al cliente" },
      steps: ["period.closed", "invoice.issued", "payment.received"],
    },
  ],
  notificationFlows: [
    {
      id: "missed-check-in",
      label: { en: "Missed check-in", es: "Check-in faltante" },
      steps: ["shift.starts", "guard.no_check_in_15min", "supervisor.alerted"],
    },
    {
      id: "critical-incident",
      label: { en: "Critical incident", es: "Incidente crítico" },
      steps: ["incident.severity_critical", "supervisor.push_sms"],
    },
  ],
  requiredIntegrations: ["clerk", "neon"],
  optionalIntegrations: ["twilio", "resend", "google-maps"],
};
