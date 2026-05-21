import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { statusDefinitions } from "@/config/statuses.config";
import { getLocale } from "next-intl/server";

const COLOR_TO_BADGE: Record<string, "violet" | "emerald" | "amber" | "cyan" | "crimson" | "neutral" | "blue"> = {
  violet: "violet",
  emerald: "emerald",
  amber: "amber",
  cyan: "cyan",
  crimson: "crimson",
  neutral: "neutral",
  blue: "blue",
};

export default async function StatusesAdminPage() {
  const locale = (await getLocale()) as "en" | "es";
  const list = Object.values(statusDefinitions);
  return (
    <AdminStubPage
      title="Statuses"
      description="Standardized statuses reusable across modules. Override labels and colors here."
      capabilities={[
        "Universal status set (pending, approved, completed, cancelled, refunded, etc.)",
        "Allowed transitions enforce a state machine",
        "Per-app overrides via `statuses` table",
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <Card key={s.key}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs">{s.key}</p>
                <Badge variant={COLOR_TO_BADGE[s.color]}>{s.label[locale]}</Badge>
              </div>
              <div className="mt-3">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                  Transitions
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {s.allowedTransitions.length === 0 ? (
                    <span className="text-xs text-on-surface-variant">terminal</span>
                  ) : (
                    s.allowedTransitions.map((t) => (
                      <Badge key={t} variant="neutral">
                        {t}
                      </Badge>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminStubPage>
  );
}
