import { ModulePlaceholder } from "@/components/app-shell/ModulePlaceholder";

export default function BookingPage() {
  return (
    <ModulePlaceholder
      title="Booking"
      category="industry"
      description="Calendar, slots, reservations with status flow (pending → approved → completed)."
      bullets={[
        "Resource calendar with conflict detection",
        "Configurable services + durations",
        "Automatic reminders via Communication Center",
      ]}
    />
  );
}
