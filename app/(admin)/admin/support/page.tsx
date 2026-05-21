import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";

export default function SupportAdminPage() {
  return (
    <AdminStubPage
      title="Support Inbox"
      description="Messages from /contact and /support forms."
      capabilities={["Assign to operator", "Reply via Resend (channel router)", "Status flow: pending → in_progress → resolved"]}
    >
      <Card>
        <CardContent className="p-10 text-center text-sm text-on-surface-variant">
          Inbox is empty. Submissions from /contact will appear here.
        </CardContent>
      </Card>
    </AdminStubPage>
  );
}
