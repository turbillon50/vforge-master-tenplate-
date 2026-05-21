import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { getLegalPage } from "@/services/legal.service";

export const metadata: Metadata = { title: "Cookie Policy" };

export default async function CookiesPage() {
  const page = await getLegalPage("cookies");
  return <LegalShell page={page} />;
}
