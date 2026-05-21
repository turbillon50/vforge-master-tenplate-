import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/marketing/PageHero";
import { BookOpen, GraduationCap, LifeBuoy, Sparkles, FileText } from "lucide-react";

export const metadata: Metadata = { title: "Knowledge" };

const sections = [
  {
    icon: Sparkles,
    title: "Getting started",
    description: "First steps after creating your account.",
    href: "/support",
  },
  {
    icon: BookOpen,
    title: "Guides",
    description: "How to use each module end-to-end.",
    href: "/faq",
  },
  {
    icon: GraduationCap,
    title: "Tutorials",
    description: "Short walkthroughs for common workflows.",
    href: "/faq",
  },
  {
    icon: FileText,
    title: "Changelog",
    description: "What changed in each release.",
    href: "/status",
  },
  {
    icon: LifeBuoy,
    title: "Support",
    description: "Reach a human when you need one.",
    href: "/contact",
  },
];

export default function KnowledgePage() {
  return (
    <>
      <PageHero
        title="Knowledge center"
        lead="Articles, tutorials and onboarding — the source of truth for everything in the product."
      />
      <section className="container pb-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link key={s.title} href={s.href}>
              <Card className="transition-colors hover:bg-surface-high">
                <CardContent className="p-6">
                  <s.icon className="h-5 w-5 text-accent-violet" />
                  <h3 className="mt-2 text-headline-sm">{s.title}</h3>
                  <p className="mt-1 text-sm text-on-surface-variant">{s.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
