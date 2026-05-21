import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROLES, roleLabels, rolePermissions } from "@/config/roles.config";
import { PERMISSION_GROUPS } from "@/config/permissions.config";
import { getLocale } from "next-intl/server";

export default async function RolesAdminPage() {
  const locale = (await getLocale()) as "en" | "es";
  return (
    <AdminStubPage
      title="Roles & Permissions"
      description="Roles are permission groups. Per-user overrides live in `user_permissions`."
      capabilities={[
        "Bundled roles editable here (writes to DB)",
        "Permission catalog from `config/permissions.config.ts`",
        "Per-user overrides surfaced on /admin/users",
      ]}
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {ROLES.map((r) => (
          <Card key={r}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-headline-sm">{roleLabels[r][locale]}</h3>
                <Badge variant="neutral">{rolePermissions[r].length} perms</Badge>
              </div>
              <ul className="mt-3 flex flex-wrap gap-1">
                {rolePermissions[r].slice(0, 6).map((p) => (
                  <Badge key={p} variant="neutral">
                    {p}
                  </Badge>
                ))}
                {rolePermissions[r].length > 6 && (
                  <Badge variant="neutral">+{rolePermissions[r].length - 6}</Badge>
                )}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          Permission groups
        </h3>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(PERMISSION_GROUPS).map(([group, perms]) => (
            <Card key={group}>
              <CardContent className="p-5">
                <h4 className="text-headline-sm">{group}</h4>
                <ul className="mt-3 flex flex-wrap gap-1">
                  {(perms as readonly string[]).map((p) => (
                    <Badge key={p} variant="neutral">
                      {p}
                    </Badge>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminStubPage>
  );
}
