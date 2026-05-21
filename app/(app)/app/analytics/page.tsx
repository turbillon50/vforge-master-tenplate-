import { ModulePlaceholder } from "@/components/app-shell/ModulePlaceholder";

export default function AnalyticsPage() {
  return (
    <ModulePlaceholder
      title="Analytics"
      category="core"
      description="KPIs and dashboards. Realtime is behind a feature flag."
      bullets={["Daily active users", "Revenue + margin", "API usage by service"]}
    />
  );
}
