import { ModulePlaceholder } from "@/components/app-shell/ModulePlaceholder";

export default function RidesPage() {
  return (
    <ModulePlaceholder
      title="Rides"
      category="industry"
      description="Uber-style trips with drivers, routing, live tracking."
      bullets={[
        "Driver onboarding + vehicle management",
        "Google Maps directions + ETA",
        "Trip lifecycle with status transitions",
      ]}
    />
  );
}
