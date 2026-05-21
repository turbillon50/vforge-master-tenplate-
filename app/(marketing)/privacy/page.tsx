import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { getLegalPage } from "@/services/legal.service";

export const metadata: Metadata = { title: "Privacy Policy" };

export default async function PrivacyPage() {
  const page = await getLegalPage("privacy");
  return <LegalShell page={page} />;
}
