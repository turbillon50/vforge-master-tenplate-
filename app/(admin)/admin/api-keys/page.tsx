import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";

export default function APIKeysAdminPage() {
  return (
    <AdminStubPage
      title="API Keys"
      description="All API keys issued by users. Scoped, rate-limited, revocable."
      capabilities={[
        "List + search by user, prefix, scope",
        "Revoke individual or bulk",
        "Rate limit overrides",
        "IP allow list (planned)",
      ]}
    >
      <Card>
        <CardContent className="p-10 text-center text-sm text-on-surface-variant">
          No API keys issued yet.
        </CardContent>
      </Card>
    </AdminStubPage>
  );
}
