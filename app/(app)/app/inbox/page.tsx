import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessagesSquare, Megaphone, FileText, Repeat } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function InboxPage() {
  const t = await getTranslations("communication");
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            Communication Center
          </p>
          <h1 className="text-headline-xl">{t("title")}</h1>
        </div>
        <Button asChild>
          <Link href="/app/inbox/conversations">{t("newConversation")}</Link>
        </Button>
      </header>

      <Tabs defaultValue="conversations">
        <TabsList>
          <TabsTrigger value="conversations">
            <MessagesSquare className="h-3.5 w-3.5" /> {t("conversations")}
          </TabsTrigger>
          <TabsTrigger value="announcements">
            <Megaphone className="h-3.5 w-3.5" /> {t("announcements")}
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="h-3.5 w-3.5" /> {t("templates")}
          </TabsTrigger>
          <TabsTrigger value="automations">
            <Repeat className="h-3.5 w-3.5" /> {t("automations")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conversations">
          <Card>
            <CardContent className="p-10 text-center text-sm text-on-surface-variant">
              Inbox is empty. Start a new conversation with another user or with support.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="announcements">
          <Card>
            <CardContent className="p-10 text-center text-sm text-on-surface-variant">
              No announcements yet. Admins can broadcast to any role / group / segment.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates">
          <Card>
            <CardContent className="p-10 text-center text-sm text-on-surface-variant">
              Templates power reusable messages across channels. Manage them in Admin → Communication.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="automations">
          <Card>
            <CardContent className="p-10 text-center text-sm text-on-surface-variant">
              Automations fire on events (payment.failed, booking.created, etc.).
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
