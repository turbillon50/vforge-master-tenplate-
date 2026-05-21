import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { brandingConfig } from "@/config/branding.config";

export default function BrandingAdminPage() {
  return (
    <AdminStubPage
      title="Branding"
      description="Logo, palette, typography, slogan. Overrides app/branding.config.ts."
      capabilities={[
        "Light + dark logos via Media Manager",
        "Accent palette switcher (violet, cyan, emerald, amber)",
        "Slogan in EN + ES",
      ]}
    >
      <Card>
        <CardContent className="p-6">
          <pre className="overflow-x-auto rounded bg-muted/50 p-4 text-xs">
            {JSON.stringify(brandingConfig, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </AdminStubPage>
  );
}
