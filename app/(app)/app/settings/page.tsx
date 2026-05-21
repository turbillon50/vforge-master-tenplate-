import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Globe, Palette, Shield, Smartphone, KeyRound } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          Account
        </p>
        <h1 className="text-headline-xl">Settings</h1>
      </header>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">
            <Globe className="h-3.5 w-3.5" /> General
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-3.5 w-3.5" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-3.5 w-3.5" /> Security
          </TabsTrigger>
          <TabsTrigger value="devices">
            <Smartphone className="h-3.5 w-3.5" /> Devices
          </TabsTrigger>
          <TabsTrigger value="apiKeys">
            <KeyRound className="h-3.5 w-3.5" /> API keys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardContent className="p-6 text-sm text-on-surface-variant">
              Language, timezone and locale preferences live here. Use the toggles in
              the top bar to change theme / locale instantly.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardContent className="p-6 text-sm text-on-surface-variant">
              Theme (light / dark / system) and UI density. UI archetypes are
              admin-controlled — ask an admin to switch.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security">
          <Card>
            <CardContent className="p-6 text-sm text-on-surface-variant">
              Password, 2FA and session management are handled by Clerk. Open your
              user menu in the top bar to access them.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="devices">
          <Card>
            <CardContent className="p-6 text-sm text-on-surface-variant">
              Active devices and recent sign-ins will appear here.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="apiKeys">
          <Card>
            <CardContent className="p-6 text-sm text-on-surface-variant">
              Personal API keys live in the API Center — see `/app/api/keys`.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
