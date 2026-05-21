"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/controls/ThemeToggle";
import { LocaleToggle } from "@/components/controls/LocaleToggle";
import { appConfig } from "@/config/app.config";
import type { AuthUser } from "@/lib/auth";

export function AdminTopBar({ user }: { user: AuthUser }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-8">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-violet/15 text-accent-violet">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <span className="text-base font-semibold tracking-tight">
              {appConfig.name} <span className="text-on-surface-variant">/ Admin</span>
            </span>
          </Link>
          <Badge variant="violet" className="hidden sm:inline-flex">
            {user.role}
          </Badge>
        </div>

        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="sm">
            <Link href="/app">Back to app</Link>
          </Button>
          <LocaleToggle />
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
