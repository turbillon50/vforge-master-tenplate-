import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";

export default function ContentAdminPage() {
  return (
    <AdminStubPage
      title="Content Blocks"
      description="Editable content blocks consumed by <ContentBlock /> across the app."
      capabilities={[
        "key/locale/data jsonb shape",
        "Inline editor with type-aware fields",
        "Auto-revalidate target pages on save",
      ]}
    >
      <Card>
        <CardContent className="p-10 text-center text-sm text-on-surface-variant">
          No content blocks defined. Create one and reference it from any component.
        </CardContent>
      </Card>
    </AdminStubPage>
  );
}
