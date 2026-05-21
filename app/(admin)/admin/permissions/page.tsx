import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALL_PERMISSIONS } from "@/config/permissions.config";

export default function PermissionsAdminPage() {
  // Group by namespace (everything before the first dot)
  const grouped = ALL_PERMISSIONS.reduce<Record<string, string[]>>((acc, p) => {
    const ns = p.split(".")[0] ?? "other";
    (acc[ns] ||= []).push(p);
    return acc;
  }, {});

  return (
    <AdminStubPage
      title="Permissions"
      description="Atomic permission catalog. Roles are permission groups; per-user overrides live in DB."
      capabilities={[
        "Define custom roles",
        "Per-user overrides (grant / revoke)",
        "Module-level + record-level scoping (planned)",
      ]}
    >
      <div className="space-y-6">
        {Object.entries(grouped).map(([ns, perms]) => (
          <div key={ns}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              {ns}
            </h3>
            <Card>
              <CardContent className="flex flex-wrap gap-2 p-5">
                {perms.map((p) => (
                  <Badge key={p} variant="neutral">
                    <span className="font-mono text-[10px]">{p}</span>
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </AdminStubPage>
  );
}
