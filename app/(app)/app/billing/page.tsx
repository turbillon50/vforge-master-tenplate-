import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Coins, Receipt, ArrowUpRight } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          Account
        </p>
        <h1 className="text-headline-xl">Billing</h1>
        <p className="text-sm text-on-surface-variant">
          Plan, payment methods, invoices and prepaid credit balance.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-headline-sm">Plan</h3>
              <Badge variant="violet">free</Badge>
            </div>
            <p className="mt-1 text-xs text-on-surface-variant">
              Upgrade for higher limits and resale-ready API credits.
            </p>
            <Button asChild size="sm" className="mt-4 w-full">
              <Link href="/pricing">
                See plans <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <Coins className="h-5 w-5 text-accent-amber" />
            <h3 className="mt-2 text-headline-sm">Credits</h3>
            <p className="mt-1 text-xs text-on-surface-variant">
              Prepaid balance for AI, WhatsApp, SMS, email and metered API calls.
            </p>
            <Button asChild size="sm" variant="outline" className="mt-4 w-full">
              <Link href="/app/api/credits">Manage credits</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <CreditCard className="h-5 w-5 text-accent-cyan" />
            <h3 className="mt-2 text-headline-sm">Payment methods</h3>
            <p className="mt-1 text-xs text-on-surface-variant">
              Add a card or set up Mercado Pago. Methods sync from your provider.
            </p>
            <Button asChild size="sm" variant="outline" className="mt-4 w-full">
              <Link href="/app/payments">Manage methods</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <Receipt className="h-4 w-4 text-accent-emerald" />
            <h3 className="text-headline-sm">Invoices</h3>
          </div>
          <p className="text-sm text-on-surface-variant">
            Your invoices will appear here. Past invoices are also emailed to your
            account address.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
