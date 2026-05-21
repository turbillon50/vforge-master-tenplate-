import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getEnabledModulesAsync, navItemsForUser } from "@/lib/modules/registry";
import { AppTopBar } from "./AppTopBar";
import { AppBottomNav } from "./AppBottomNav";
import { AppSideNav } from "./AppSideNav";

export async function AppShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser().catch(() => null);
  if (!user) redirect("/sign-in");

  const modules = await getEnabledModulesAsync();
  const navItems = navItemsForUser(modules, user);

  return (
    <div className="flex min-h-dvh flex-col">
      <AppTopBar user={user} />
      <div className="flex flex-1">
        <AppSideNav items={navItems} />
        <main className="flex-1 pb-24 md:pb-10">
          <div className="container py-6 md:py-8">{children}</div>
        </main>
      </div>
      <AppBottomNav items={navItems} />
    </div>
  );
}
