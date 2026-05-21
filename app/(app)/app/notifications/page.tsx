import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, BellOff, Mail, MessageSquare, Smartphone } from "lucide-react";

export default function NotificationsPage() {
  const channels = [
    { icon: Bell, label: "In-app", description: "Real-time notifications inside the app.", on: true },
    { icon: Mail, label: "Email", description: "Receipts, security alerts and product updates.", on: true },
    { icon: MessageSquare, label: "WhatsApp", description: "Operational updates by WhatsApp.", on: false },
    { icon: Smartphone, label: "Push", description: "Mobile push notifications via the PWA.", on: false },
  ];

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          Preferences
        </p>
        <h1 className="text-headline-xl">Notifications</h1>
        <p className="text-sm text-on-surface-variant">
          Choose how and when you want to be reached. Channels can be enabled by your
          admin and by you.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {channels.map((c) => (
          <Card key={c.label}>
            <CardContent className="flex items-start gap-3 p-5">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-violet/15 text-accent-violet">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-headline-sm">{c.label}</h3>
                  {c.on ? (
                    <Badge variant="emerald">on</Badge>
                  ) : (
                    <Badge variant="neutral">off</Badge>
                  )}
                </div>
                <p className="mt-1 text-xs text-on-surface-variant">{c.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="flex items-start gap-3 p-5">
          <BellOff className="mt-0.5 h-4 w-4 text-on-surface-variant" />
          <p className="text-xs text-on-surface-variant">
            Quiet hours, escalation rules and digest cadence are managed by your admin
            under Admin → Communication.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
