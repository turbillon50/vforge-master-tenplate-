import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";

export default function AccountDeletionAdminPage() {
  return (
    <AdminStubPage
      title="Account Deletion"
      description="Process App Store / Play Store compliant deletion requests."
      capabilities={[
        "Inbox of `deletion_requests` rows",
        "Status flow: pending → processing → completed | denied",
        "Email confirmation via Resend on every state change",
        "Audit log entry per state change",
      ]}
    >
      <Card>
        <CardContent className="p-10 text-center text-sm text-on-surface-variant">
          Deletion requests will appear here as users submit them from /delete-account.
        </CardContent>
      </Card>
    </AdminStubPage>
  );
}
