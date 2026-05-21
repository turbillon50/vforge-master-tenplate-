import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MESSAGE_TYPE_DEFINITIONS, CHANNEL_LABELS } from "@/config/communication.config";
import { getLocale } from "next-intl/server";

export default async function CommunicationAdminPage() {
  const locale = (await getLocale()) as "en" | "es";
  const types = Object.values(MESSAGE_TYPE_DEFINITIONS);
  return (
    <AdminStubPage
      title="Communication Center"
      description="Multi-channel engine: in-app, email, WhatsApp, SMS, push. Announcements, conversations, templates, automations."
      capabilities={[
        "Recipient filters by role, group, status, location, module, tag",
        "Per-channel delivery + read receipts",
        "Scheduled messages + automations",
        "Templates with variables",
      ]}
    >
      <Tabs defaultValue="announcements">
        <TabsList>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
        </TabsList>

        <TabsContent value="announcements">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-headline-sm">New announcement</h3>
                <Button size="sm">Create</Button>
              </div>
              <p className="mt-2 text-sm text-on-surface-variant">
                Compose, pick recipients, choose channels, schedule. Track delivery + reads + replies.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversations">
          <Card>
            <CardContent className="p-10 text-center text-sm text-on-surface-variant">
              Direct messages and support conversations land here.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid gap-3 sm:grid-cols-2">
            {types.map((t) => (
              <Card key={t.key}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-headline-sm">{t.label[locale]}</h3>
                    <Badge
                      variant={
                        t.priority === "urgent"
                          ? "crimson"
                          : t.priority === "high"
                            ? "amber"
                            : t.priority === "normal"
                              ? "violet"
                              : "neutral"
                      }
                    >
                      {t.priority}
                    </Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {t.defaultChannels.map((c) => (
                      <Badge key={c} variant="neutral">
                        {CHANNEL_LABELS[c].en}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="automations">
          <Card>
            <CardContent className="p-10 text-center text-sm text-on-surface-variant">
              Trigger automations on events like payment.failed, booking.created, membership.expiring.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
            {Object.entries(CHANNEL_LABELS).map(([key, l]) => (
              <Card key={key}>
                <CardContent className="p-5">
                  <p className="text-sm font-medium">{l.en}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-on-surface-variant">
                    {key}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AdminStubPage>
  );
}
