import { AdminStubPage } from "@/components/admin/AdminStubPage";

export default function AutomationsAdminPage() {
  return (
    <AdminStubPage
      title="Automation Engine"
      description="Event-driven automations: when X happens, do Y."
      capabilities={[
        "Triggers: any platform event (order.created, lead.idle, etc.)",
        "Actions: send WhatsApp / email / SMS / push / webhook / AI run",
        "Conditional branches + delays",
        "Per-tenant rule library",
      ]}
    />
  );
}
