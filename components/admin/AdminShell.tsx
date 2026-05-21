import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAdminRole } from "@/config/roles.config";
import { AdminTopBar } from "./AdminTopBar";
import { AdminSideNav } from "./AdminSideNav";

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser().catch(() => null);
  if (!user) redirect("/sign-in");
  if (!isAdminRole(user.role)) redirect("/app");

  return (
    <div className="flex min-h-dvh flex-col">
      <AdminTopBar user={user} />
      <div className="flex flex-1">
        <AdminSideNav />
        <main className="flex-1 px-4 pb-16 pt-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
