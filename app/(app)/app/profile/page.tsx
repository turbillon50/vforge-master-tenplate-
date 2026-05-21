import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { roleLabels } from "@/config/roles.config";
import { getLocale } from "next-intl/server";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  const locale = (await getLocale()) as "en" | "es";
  if (!user) return null;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Avatar className="h-16 w-16">
          {user.imageUrl && <AvatarImage src={user.imageUrl} alt={user.fullName ?? ""} />}
          <AvatarFallback>
            {(user.fullName ?? user.email ?? "?").slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-headline-lg">{user.fullName ?? user.email}</h1>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm text-on-surface-variant">{user.email}</span>
            <Badge variant="violet">{roleLabels[user.role][locale]}</Badge>
          </div>
        </div>
      </header>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-headline-sm">Permissions</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {user.permissions.length === 0 ? (
                  <p className="text-sm text-on-surface-variant">
                    No permissions assigned. Roles are managed by admins.
                  </p>
                ) : (
                  user.permissions.map((p) => (
                    <Badge key={p} variant="neutral">
                      {p}
                    </Badge>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences">
          <Card>
            <CardContent className="p-6 text-sm text-on-surface-variant">
              Notification, language and theme preferences live here. Edit them inline.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardContent className="p-6 text-sm text-on-surface-variant">
              Logins, payments, API key usage, support requests will appear here.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardContent className="p-6 text-sm text-on-surface-variant">
              Password, 2FA and session management is handled by Clerk. Use the user menu.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
