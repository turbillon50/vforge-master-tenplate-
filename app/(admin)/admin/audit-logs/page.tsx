import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";

export default function AuditLogsAdminPage() {
  return (
    <AdminStubPage
      title="Audit Logs"
      description="Append-only log of sensitive actions: who did what, when, from where."
      capabilities={[
        "User logins + impersonation",
        "Role / permission changes",
        "Payment + refund operations",
        "Integration key rotations",
        "Export to SIEM via webhook",
      ]}
    >
      <Card>
        <CardContent className="p-10 text-center text-sm text-on-surface-variant">
          No events captured yet. Audit logs populate as the app is used.
        </CardContent>
      </Card>
    </AdminStubPage>
  );
}
