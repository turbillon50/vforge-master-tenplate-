"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Sparkles, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/controls/ThemeToggle";
import { LocaleToggle } from "@/components/controls/LocaleToggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { appConfig } from "@/config/app.config";

const navLinks = [
  { key: "features", href: "/features" },
  { key: "pricing", href: "/pricing" },
  { key: "faq", href: "/faq" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function MarketingHeader() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-violet/15 text-accent-violet">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-base font-semibold tracking-tight">{appConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-high hover:text-foreground"
            >
              {t(l.key as never)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LocaleToggle />
          <ThemeToggle />
          <div className="ml-1 hidden gap-2 md:flex">
            <Button asChild variant="ghost" size="sm">
              <Link href="/sign-in">{t("signIn")}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/sign-up">{t("signUp")}</Link>
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>{appConfig.name}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.key}
                    href={l.href}
                    className="rounded-md px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-high hover:text-foreground"
                  >
                    {t(l.key as never)}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <Button asChild variant="outline">
                    <Link href="/sign-in">{t("signIn")}</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/sign-up">{t("signUp")}</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
