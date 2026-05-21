import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KeyRound, Coins, Activity, BookOpen } from "lucide-react";

export default function APICenterPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
            API Center
          </p>
          <h1 className="text-headline-xl">Build with our API</h1>
        </div>
        <Button>New API key</Button>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { icon: Coins, label: "Balance", value: "0 credits", color: "violet" as const },
          { icon: KeyRound, label: "Active keys", value: "0", color: "cyan" as const },
          { icon: Activity, label: "Calls (24h)", value: "0", color: "emerald" as const },
          { icon: BookOpen, label: "Docs", value: "Browse", color: "amber" as const },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-3 p-5">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-violet/15 text-accent-violet">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant">{s.label}</p>
                <p className="text-headline-sm">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="keys">
        <TabsList>
          <TabsTrigger value="keys">Keys</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="credits">Credits</TabsTrigger>
          <TabsTrigger value="docs">Docs</TabsTrigger>
        </TabsList>

        <TabsContent value="keys">
          <Card>
            <CardContent className="p-10 text-center">
              <p className="text-sm text-on-surface-variant">
                No API keys yet. Create one to start integrating.
              </p>
              <p className="mt-2 text-xs text-on-surface-variant">
                Secrets are shown ONCE. Store them safely — we keep only a hashed copy.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-headline-sm">Consumption</h3>
              <p className="mt-2 text-sm text-on-surface-variant">
                Every billable event lands in <code>usage_ledger</code> with quantity, cost,
                sale price and margin. AI calls also write to <code>ai_usage_events</code>.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "ai_completion",
                  "ai_embedding",
                  "ai_image",
                  "whatsapp_message",
                  "sms_message",
                  "email_batch",
                  "api_call",
                  "automation_run",
                ].map((s) => (
                  <Badge key={s} variant="neutral">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-headline-sm">Prepaid credits</h3>
              <p className="mt-2 text-sm text-on-surface-variant">
                Buy credit packs to power AI, messaging and automations. Usage is debited from
                your wallet in real time.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs">
          <Card>
            <CardContent className="p-6 text-sm text-on-surface-variant">
              Getting started, authentication, endpoints, error codes, rate limits and billing
              rules will appear here. Generated from your enabled modules.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
