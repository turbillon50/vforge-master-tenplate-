/**
 * Granular permission catalog.
 * Permissions are atomic, modular, scalable.
 * Roles (roles.config.ts) are permission groups.
 * Per-user overrides live in DB `user_permissions`.
 */

export const PERMISSIONS = {
  // Users
  USERS_VIEW: "users.view",
  USERS_MANAGE: "users.manage",
  USERS_DELETE: "users.delete",
  USERS_IMPERSONATE: "users.impersonate",

  // Roles & permissions
  ROLES_VIEW: "roles.view",
  ROLES_MANAGE: "roles.manage",

  // Content
  CONTENT_VIEW: "content.view",
  CONTENT_EDIT: "content.edit",
  CONTENT_PUBLISH: "content.publish",

  // Legal pages
  LEGAL_VIEW: "legal.view",
  LEGAL_EDIT: "legal.edit",

  // FAQ
  FAQ_VIEW: "faq.view",
  FAQ_EDIT: "faq.edit",

  // Social links
  SOCIAL_VIEW: "social.view",
  SOCIAL_EDIT: "social.edit",

  // Media
  MEDIA_VIEW: "media.view",
  MEDIA_UPLOAD: "media.upload",
  MEDIA_DELETE: "media.delete",
  MEDIA_MANAGE_FOLDERS: "media.manage_folders",

  // Modules
  MODULES_VIEW: "modules.view",
  MODULES_MANAGE: "modules.manage",

  // Integrations
  INTEGRATIONS_VIEW: "integrations.view",
  INTEGRATIONS_MANAGE: "integrations.manage",

  // Payments
  PAYMENTS_VIEW: "payments.view",
  PAYMENTS_REFUND: "payments.refund",
  PAYMENTS_MANAGE: "payments.manage",

  // Analytics
  ANALYTICS_VIEW: "analytics.view",

  // Notifications
  NOTIFICATIONS_VIEW: "notifications.view",
  NOTIFICATIONS_SEND: "notifications.send",
  NOTIFICATIONS_MANAGE: "notifications.manage",

  // Support
  SUPPORT_VIEW: "support.view",
  SUPPORT_REPLY: "support.reply",
  SUPPORT_MANAGE: "support.manage",

  // Account deletion
  DELETION_VIEW: "deletion.view",
  DELETION_PROCESS: "deletion.process",

  // Audit logs
  AUDIT_VIEW: "audit.view",

  // Feature flags
  FEATURE_FLAGS_VIEW: "feature_flags.view",
  FEATURE_FLAGS_MANAGE: "feature_flags.manage",

  // Branding & settings
  BRANDING_EDIT: "branding.edit",
  SETTINGS_EDIT: "settings.edit",

  // Records (generic CRUD across modules)
  RECORDS_VIEW: "records.view",
  RECORDS_CREATE: "records.create",
  RECORDS_EDIT: "records.edit",
  RECORDS_DELETE: "records.delete",
  RECORDS_EXPORT: "records.export",

  // API center
  API_KEYS_VIEW: "api.keys.view",
  API_KEYS_MANAGE: "api.keys.manage",
  API_USAGE_VIEW: "api.usage.view",
  API_USAGE_VIEW_ALL: "api.usage.view_all",

  // Credits
  CREDITS_VIEW: "credits.view",
  CREDITS_ADJUST: "credits.adjust",
  CREDITS_GRANT: "credits.grant",
  CREDITS_REFUND: "credits.refund",

  // Communication center
  COMMUNICATION_VIEW: "communication.view",
  COMMUNICATION_SEND: "communication.send",
  COMMUNICATION_ANNOUNCE: "communication.announce",
  COMMUNICATION_TEMPLATES_MANAGE: "communication.templates.manage",
  COMMUNICATION_AUTOMATIONS_MANAGE: "communication.automations.manage",
} as const;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const PERMISSION_GROUPS = {
  Users: [
    PERMISSIONS.USERS_VIEW,
    PERMISSIONS.USERS_MANAGE,
    PERMISSIONS.USERS_DELETE,
    PERMISSIONS.USERS_IMPERSONATE,
  ],
  RolesAndAccess: [
    PERMISSIONS.ROLES_VIEW,
    PERMISSIONS.ROLES_MANAGE,
    PERMISSIONS.FEATURE_FLAGS_VIEW,
    PERMISSIONS.FEATURE_FLAGS_MANAGE,
  ],
  Content: [
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.CONTENT_EDIT,
    PERMISSIONS.CONTENT_PUBLISH,
    PERMISSIONS.LEGAL_VIEW,
    PERMISSIONS.LEGAL_EDIT,
    PERMISSIONS.FAQ_VIEW,
    PERMISSIONS.FAQ_EDIT,
    PERMISSIONS.SOCIAL_VIEW,
    PERMISSIONS.SOCIAL_EDIT,
  ],
  Media: [
    PERMISSIONS.MEDIA_VIEW,
    PERMISSIONS.MEDIA_UPLOAD,
    PERMISSIONS.MEDIA_DELETE,
    PERMISSIONS.MEDIA_MANAGE_FOLDERS,
  ],
  Modules: [PERMISSIONS.MODULES_VIEW, PERMISSIONS.MODULES_MANAGE],
  Integrations: [PERMISSIONS.INTEGRATIONS_VIEW, PERMISSIONS.INTEGRATIONS_MANAGE],
  Payments: [
    PERMISSIONS.PAYMENTS_VIEW,
    PERMISSIONS.PAYMENTS_REFUND,
    PERMISSIONS.PAYMENTS_MANAGE,
  ],
  Analytics: [PERMISSIONS.ANALYTICS_VIEW],
  Notifications: [
    PERMISSIONS.NOTIFICATIONS_VIEW,
    PERMISSIONS.NOTIFICATIONS_SEND,
    PERMISSIONS.NOTIFICATIONS_MANAGE,
  ],
  Support: [
    PERMISSIONS.SUPPORT_VIEW,
    PERMISSIONS.SUPPORT_REPLY,
    PERMISSIONS.SUPPORT_MANAGE,
    PERMISSIONS.DELETION_VIEW,
    PERMISSIONS.DELETION_PROCESS,
  ],
  Audit: [PERMISSIONS.AUDIT_VIEW],
  Settings: [PERMISSIONS.BRANDING_EDIT, PERMISSIONS.SETTINGS_EDIT],
  Records: [
    PERMISSIONS.RECORDS_VIEW,
    PERMISSIONS.RECORDS_CREATE,
    PERMISSIONS.RECORDS_EDIT,
    PERMISSIONS.RECORDS_DELETE,
    PERMISSIONS.RECORDS_EXPORT,
  ],
  ApiCenter: [
    PERMISSIONS.API_KEYS_VIEW,
    PERMISSIONS.API_KEYS_MANAGE,
    PERMISSIONS.API_USAGE_VIEW,
    PERMISSIONS.API_USAGE_VIEW_ALL,
  ],
  Credits: [
    PERMISSIONS.CREDITS_VIEW,
    PERMISSIONS.CREDITS_ADJUST,
    PERMISSIONS.CREDITS_GRANT,
    PERMISSIONS.CREDITS_REFUND,
  ],
  Communication: [
    PERMISSIONS.COMMUNICATION_VIEW,
    PERMISSIONS.COMMUNICATION_SEND,
    PERMISSIONS.COMMUNICATION_ANNOUNCE,
    PERMISSIONS.COMMUNICATION_TEMPLATES_MANAGE,
    PERMISSIONS.COMMUNICATION_AUTOMATIONS_MANAGE,
  ],
} as const;

export const ALL_PERMISSIONS: PermissionKey[] = Object.values(PERMISSIONS);
