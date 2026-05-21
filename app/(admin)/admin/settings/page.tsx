import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { appConfig } from "@/config/app.config";

export default function SettingsAdminPage() {
  return (
    <AdminStubPage
      title="App Settings"
      description="App name, support email, default locale, default theme, environment."
      capabilities={[
        "Overrides app.config.ts via app_settings table",
        "Cached per-request, revalidated on save",
        "Audit log entry on every mutation",
      ]}
    >
      <Card>
        <CardContent className="p-6">
          <pre className="overflow-x-auto rounded bg-muted/50 p-4 text-xs">
            {JSON.stringify(appConfig, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </AdminStubPage>
  );
}
