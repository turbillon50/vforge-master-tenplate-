"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard,
  Users,
  Trash2,
  Package,
  FileText,
  ScrollText,
  HelpCircle,
  Share2,
  Image as ImageIcon,
  Palette,
  Settings,
  Bell,
  MessagesSquare,
  CreditCard,
  Plug,
  LifeBuoy,
  ClipboardList,
  ShieldCheck,
  Flag,
  Activity,
  KeyRound,
  Coins,
  BarChart3,
  BookOpen,
  Newspaper,
  Workflow,
  History,
  Lock,
  Boxes,
  Brush,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  {
    title: "core",
    items: [
      { key: "overview", href: "/admin", icon: LayoutDashboard },
      { key: "users", href: "/admin/users", icon: Users },
      { key: "roles", href: "/admin/roles", icon: ShieldCheck },
      { key: "permissions", href: "/admin/permissions", icon: Lock, labelOverride: "Permissions" },
      { key: "featureFlags", href: "/admin/feature-flags", icon: Flag },
      { key: "statuses", href: "/admin/statuses", icon: Activity },
    ],
  },
  {
    title: "content",
    items: [
      { key: "content", href: "/admin/content", icon: FileText },
      { key: "knowledge", href: "/admin/knowledge", icon: BookOpen, labelOverride: "Knowledge" },
      { key: "legal", href: "/admin/legal", icon: ScrollText },
      { key: "press", href: "/admin/press", icon: Newspaper, labelOverride: "Press" },
      { key: "faqManager", href: "/admin/faq", icon: HelpCircle },
      { key: "socialLinks", href: "/admin/social-links", icon: Share2 },
      { key: "media", href: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    title: "ops",
    items: [
      { key: "communication", href: "/admin/communication", icon: MessagesSquare },
      { key: "notifications", href: "/admin/notifications", icon: Bell },
      { key: "automations", href: "/admin/automations", icon: Workflow, labelOverride: "Automations" },
      { key: "support", href: "/admin/support", icon: LifeBuoy },
      { key: "accountDeletion", href: "/admin/account-deletion", icon: Trash2 },
    ],
  },
  {
    title: "growth",
    items: [
      { key: "analytics", href: "/admin/analytics", icon: BarChart3, labelOverride: "Analytics" },
      { key: "payments", href: "/admin/payments", icon: CreditCard },
      { key: "apiKeys", href: "/admin/api-keys", icon: KeyRound, labelOverride: "API Keys" },
      { key: "credits", href: "/admin/credits", icon: Coins, labelOverride: "Credits" },
      { key: "usage", href: "/admin/usage", icon: Activity, labelOverride: "Usage" },
    ],
  },
  {
    title: "system",
    items: [
      { key: "modules", href: "/admin/modules", icon: Package },
      { key: "industry", href: "/admin/industry", icon: Boxes, labelOverride: "Industry" },
      { key: "uiMode", href: "/admin/ui-mode", icon: Brush, labelOverride: "UI Mode" },
      { key: "integrations", href: "/admin/integrations", icon: Plug },
      { key: "branding", href: "/admin/branding", icon: Palette },
      { key: "settings", href: "/admin/settings", icon: Settings },
      { key: "auditLogs", href: "/admin/audit-logs", icon: History, labelOverride: "Audit Logs" },
      { key: "logs", href: "/admin/logs", icon: ClipboardList },
    ],
  },
] as const;

export function AdminSideNav() {
  const pathname = usePathname();
  const t = useTranslations("admin");

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border/60 px-3 py-6 md:block">
      <nav className="flex flex-col gap-4">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">
              {section.title}
            </p>
            <div className="flex flex-col">
              {section.items.map((item) => {
                const active =
                  item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                const label =
                  "labelOverride" in item && item.labelOverride
                    ? item.labelOverride
                    : t(item.key as never);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-surface-high text-foreground"
                        : "text-on-surface-variant hover:bg-surface-high hover:text-foreground",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
