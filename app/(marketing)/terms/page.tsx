import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { getLegalPage } from "@/services/legal.service";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default async function TermsPage() {
  const page = await getLegalPage("terms");
  return <LegalShell page={page} />;
}
