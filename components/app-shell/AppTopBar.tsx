import Link from "next/link";
import { Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/controls/ThemeToggle";
import { LocaleToggle } from "@/components/controls/LocaleToggle";
import { appConfig } from "@/config/app.config";
import { Badge } from "@/components/ui/badge";
import { IS_DEMO_MODE, type AuthUser } from "@/lib/auth";
import { isAdminRole } from "@/config/roles.config";
import { UserButtonOrDemo } from "@/components/auth/UserButtonOrDemo";

export function AppTopBar({ user }: { user: AuthUser }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/app" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-violet/15 text-accent-violet">
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="hidden text-base font-semibold tracking-tight sm:inline">
              {appConfig.name}
            </span>
          </Link>
          {isAdminRole(user.role) && (
            <Badge variant="violet" className="hidden sm:inline-flex">
              {user.role}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <LocaleToggle />
          <ThemeToggle />
          {isAdminRole(user.role) && (
            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
              <Link href="/admin">Admin</Link>
            </Button>
          )}
          <UserButtonOrDemo
            isDemo={IS_DEMO_MODE}
            demoName={user.fullName ?? "Demo"}
            demoEmail={user.email ?? "demo@vforge.app"}
          />
        </div>
      </div>
    </header>
  );
}
