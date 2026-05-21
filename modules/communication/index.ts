/**
 * Universal Communication Center module.
 * Multi-channel engine: in-app, email, WhatsApp, SMS, push.
 * Announcements, conversations, templates, automations, read receipts.
 */
import type { Module } from "@/lib/modules/module";
import { modulesConfig } from "@/config/modules.config";

const meta = modulesConfig.communication;

export const communicationModule: Module = {
  id: "communication",
  meta,
  appNavItems: meta.navItems,
  adminPages: [
    {
      href: "/admin/communication",
      label: { en: "Communication", es: "Comunicación" },
      icon: "MessagesSquare",
      permission: "communication.view",
      description: {
        en: "Compose announcements, manage conversations, edit templates and automations.",
        es: "Crea anuncios, gestiona conversaciones, edita plantillas y automatizaciones.",
      },
    },
  ],
};

export default communicationModule;
