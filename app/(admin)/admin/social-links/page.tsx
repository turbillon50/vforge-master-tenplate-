import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { socialPlatforms, SOCIAL_PLATFORM_IDS } from "@/config/social.config";
import { Input } from "@/components/ui/input";

export default function SocialLinksAdminPage() {
  return (
    <AdminStubPage
      title="Social Links"
      description="Paste URLs once. They propagate to footer, contact page, share buttons everywhere."
      capabilities={[
        "Instagram, Facebook, TikTok, YouTube, X, LinkedIn, WhatsApp, Website",
        "Toggle per platform; sort order configurable",
        "Cache-tagged: changes are visible immediately across the app",
      ]}
    >
      <div className="grid gap-3 md:grid-cols-2">
        {SOCIAL_PLATFORM_IDS.map((id) => {
          const p = socialPlatforms[id];
          return (
            <Card key={id}>
              <CardContent className="flex items-center gap-3 p-4">
                <div
                  className="grid h-9 w-9 place-items-center rounded-full border border-border"
                  style={{ background: `${p.color}22` }}
                >
                  <span className="text-xs font-bold" style={{ color: p.color }}>
                    {p.label.slice(0, 1)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{p.label}</p>
                    <Badge variant="neutral">disabled</Badge>
                  </div>
                  <Input placeholder={p.urlPrefix ?? "https://"} className="mt-1 h-8" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </AdminStubPage>
  );
}
