"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { LayoutDashboard, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import type { ModuleId } from "@/config/modules.config";

interface Item {
  id: ModuleId | "dashboard";
  href: string;
  label: { en: string; es: string };
  icon: string;
}

export function AppSideNav({ items }: { items: Array<Omit<Item, "id"> & { id: ModuleId }> }) {
  const pathname = usePathname();
  const locale = useLocale() as "en" | "es";

  const all: Item[] = [
    {
      id: "dashboard",
      href: "/app",
      label: { en: "Dashboard", es: "Inicio" },
      icon: "LayoutDashboard",
    },
    ...items,
  ];

  return (
    <aside className="hidden w-60 shrink-0 border-r border-border/60 px-3 py-6 md:block">
      <nav className="flex flex-col gap-1">
        {all.map((item) => {
          const Icon =
            ((Icons as unknown as Record<string, LucideIcon>)[item.icon] ?? LayoutDashboard);
          const active =
            item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href);
          return (
            <Link
              key={`${item.id}-${item.href}`}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-surface-high text-foreground"
                  : "text-on-surface-variant hover:bg-surface-high hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label[locale]}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
