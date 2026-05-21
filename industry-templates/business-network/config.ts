import type { IndustryTemplate } from "@/config/industry.config";

export const businessNetworkTemplate: IndustryTemplate = {
  id: "business-network",
  name: { en: "Business Network", es: "Red de Negocios" },
  tagline: {
    en: "Local business directory with memberships, referrals and a community feed.",
    es: "Directorio local con membresías, referidos y feed comunitario.",
  },
  description: {
    en: "Multi-tenant business directory: business profiles, categories, memberships, referrals, internal messaging, promotions, admin approval flow and community feed placeholder. Inspired by Tortillap-style networks.",
    es: "Directorio multi-tenant: perfiles de negocio, categorías, membresías, referidos, mensajería interna, promociones, aprobación admin y feed comunitario. Inspirado en redes tipo Tortillap.",
  },
  icon: "Network",
  recommendedArchetype: "marketplace",
  modules: [
    "marketplace",
    "communication",
    "subscriptions",
    "user-operations",
    "notifications",
    "analytics",
    "dynamic-content",
  ],
  roles: [
    {
      key: "network_admin",
      label: { en: "Network admin", es: "Admin de la red" },
      description: { en: "Curates the directory, approves businesses, runs the community.", es: "Cura el directorio, aprueba negocios, gestiona la comunidad." },
    },
    {
      key: "business_owner",
      label: { en: "Business owner", es: "Dueño de negocio" },
      description: { en: "Manages their business profile, promotions and referrals.", es: "Gestiona su perfil, promociones y referidos." },
    },
    {
      key: "member",
      label: { en: "Member", es: "Miembro" },
      description: { en: "Belongs to the community, follows businesses, sends referrals.", es: "Pertenece a la comunidad, sigue negocios, envía referidos." },
    },
    {
      key: "guest",
      label: { en: "Guest", es: "Invitado" },
      description: { en: "Browses public directory.", es: "Explora el directorio público." },
    },
  ],
  dashboardSections: [
    { key: "directory", label: { en: "Directory", es: "Directorio" }, href: "/app/marketplace", icon: "Network" },
    { key: "messages", label: { en: "Messages", es: "Mensajes" }, href: "/app/inbox", icon: "MessagesSquare" },
    { key: "membership", label: { en: "Membership", es: "Membresía" }, href: "/app/subscriptions", icon: "BadgeCheck" },
    { key: "profile", label: { en: "Profile", es: "Perfil" }, href: "/app/profile", icon: "UserCog" },
  ],
  adminSections: [
    { key: "businesses", label: { en: "Businesses", es: "Negocios" }, href: "/admin/content", icon: "Network" },
    { key: "categories", label: { en: "Categories", es: "Categorías" }, href: "/admin/content", icon: "Tag" },
    { key: "members", label: { en: "Members", es: "Miembros" }, href: "/admin/users", icon: "Users" },
    { key: "announcements", label: { en: "Announcements", es: "Anuncios" }, href: "/admin/communication", icon: "Megaphone" },
  ],
  dataModels: [
    {
      name: "Business",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "ownerId", type: "uuid", required: true },
        { name: "name", type: "string", required: true },
        { name: "slug", type: "string", required: true },
        { name: "categoryId", type: "uuid" },
        { name: "description", type: "text" },
        { name: "phone", type: "string" },
        { name: "address", type: "string" },
        { name: "lat", type: "decimal" },
        { name: "lng", type: "decimal" },
        { name: "status", type: "enum:pending|approved|suspended|rejected", required: true },
        { name: "verified", type: "boolean" },
        { name: "media", type: "json" },
      ],
    },
    {
      name: "Membership",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "userId", type: "uuid", required: true },
        { name: "tier", type: "enum:free|business|premium" },
        { name: "status", type: "enum:active|past_due|cancelled" },
        { name: "renewsAt", type: "timestamp" },
      ],
    },
    {
      name: "Referral",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "fromUserId", type: "uuid", required: true },
        { name: "toBusinessId", type: "uuid", required: true },
        { name: "note", type: "text" },
        { name: "status", type: "enum:sent|received|won|lost" },
      ],
    },
    {
      name: "Promotion",
      fields: [
        { name: "id", type: "uuid", required: true },
        { name: "businessId", type: "uuid", required: true },
        { name: "title", type: "string", required: true },
        { name: "validUntil", type: "timestamp" },
        { name: "discountPct", type: "int" },
      ],
    },
  ],
  communicationFlows: [
    {
      id: "business-approval",
      label: { en: "Business approval", es: "Aprobación de negocio" },
      steps: ["owner.submits", "admin.reviews", "email.notify_decision"],
    },
    {
      id: "member-to-business",
      label: { en: "Member → business message", es: "Mensaje miembro → negocio" },
      steps: ["member.opens_chat", "business.responds"],
    },
    {
      id: "network-announcement",
      label: { en: "Network announcement", es: "Anuncio de la red" },
      steps: ["admin.composes", "broadcast.send_all_members"],
    },
  ],
  paymentFlows: [
    {
      id: "membership-subscription",
      label: { en: "Membership subscription", es: "Suscripción de membresía" },
      steps: ["user.picks_tier", "payment.confirm", "membership.activate"],
    },
  ],
  notificationFlows: [
    {
      id: "new-business",
      label: { en: "New business in your area", es: "Nuevo negocio en tu zona" },
      steps: ["business.approved", "members.notify_by_geo"],
    },
    {
      id: "referral-received",
      label: { en: "Referral received", es: "Referido recibido" },
      steps: ["referral.created", "business.push_notification"],
    },
  ],
  requiredIntegrations: ["clerk", "neon"],
  optionalIntegrations: ["stripe", "mercadopago", "twilio", "resend", "google-maps"],
};
