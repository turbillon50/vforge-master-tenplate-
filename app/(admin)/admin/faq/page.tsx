import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = ["public", "app", "payments", "account", "privacy"] as const;

export default function FAQAdminPage() {
  return (
    <AdminStubPage
      title="FAQs"
      description="Manage public + in-app FAQs grouped by category."
      capabilities={[
        "Bilingual EN/ES per item",
        "Categories: public, app, payments, account, privacy",
        "Auto-publishes to /faq when published=true",
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Card key={c}>
            <CardContent className="p-5">
              <Badge variant="violet">{c}</Badge>
              <p className="mt-3 text-sm text-on-surface-variant">No items yet.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminStubPage>
  );
}
