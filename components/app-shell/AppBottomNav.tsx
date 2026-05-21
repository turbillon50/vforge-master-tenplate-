"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Home, type LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import type { ModuleId } from "@/config/modules.config";

interface Item {
  id: ModuleId;
  href: string;
  label: { en: string; es: string };
  icon: string;
}

export function AppBottomNav({ items }: { items: Item[] }) {
  const pathname = usePathname();
  const locale = useLocale() as "en" | "es";
  const visible = items.slice(0, 4);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-background/95 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="container grid grid-cols-5 gap-1 py-1.5">
        <li>
          <Link
            href="/app"
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-md py-1.5 text-[10px] font-medium",
              pathname === "/app"
                ? "text-foreground"
                : "text-on-surface-variant",
            )}
          >
            <Home className="h-4 w-4" />
            <span>{locale === "es" ? "Inicio" : "Home"}</span>
          </Link>
        </li>
        {visible.map((item) => {
          const Icon =
            ((Icons as unknown as Record<string, LucideIcon>)[item.icon] ?? Home);
          const active = pathname.startsWith(item.href);
          return (
            <li key={`${item.id}-${item.href}`}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-md py-1.5 text-[10px] font-medium",
                  active ? "text-foreground" : "text-on-surface-variant",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate max-w-full">{item.label[locale]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
