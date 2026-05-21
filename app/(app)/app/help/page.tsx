import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { LifeBuoy, BookOpen, Mail, MessageSquare } from "lucide-react";

const helpEntries = [
  {
    icon: BookOpen,
    title: "Knowledge center",
    description: "Guides, tutorials and onboarding articles.",
    href: "/knowledge",
  },
  {
    icon: LifeBuoy,
    title: "FAQ",
    description: "Most common questions, organized by topic.",
    href: "/faq",
  },
  {
    icon: MessageSquare,
    title: "Talk to support",
    description: "Open a conversation from your inbox.",
    href: "/app/inbox",
  },
  {
    icon: Mail,
    title: "Email us",
    description: "Reach the team for billing or technical issues.",
    href: "/contact",
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
          Help
        </p>
        <h1 className="text-headline-xl">How can we help?</h1>
        <p className="text-sm text-on-surface-variant">
          Self-serve docs, FAQs and a direct line to support.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {helpEntries.map((e) => (
          <Link key={e.title} href={e.href}>
            <Card className="transition-colors hover:bg-surface-high">
              <CardContent className="flex items-start gap-3 p-5">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-violet/15 text-accent-violet">
                  <e.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-headline-sm">{e.title}</h3>
                  <p className="mt-1 text-xs text-on-surface-variant">{e.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
