import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";

export default function NotificationsAdminPage() {
  return (
    <AdminStubPage
      title="Notifications"
      description="Low-level transactional notifications: email, SMS, WhatsApp, push."
      capabilities={[
        "Email via Resend",
        "SMS + WhatsApp via Twilio",
        "Push via Web Push API",
        "Channel toggles via feature flags",
      ]}
    >
      <Card>
        <CardContent className="p-10 text-center text-sm text-on-surface-variant">
          For broadcasts / conversations / announcements use the Communication Center.
        </CardContent>
      </Card>
    </AdminStubPage>
  );
}
