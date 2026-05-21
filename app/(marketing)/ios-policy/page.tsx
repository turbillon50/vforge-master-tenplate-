import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { getLegalPage } from "@/services/legal.service";

export const metadata: Metadata = { title: "App Store Policy" };

export default async function IOSPolicyPage() {
  const page = await getLegalPage("ios-policy");
  return <LegalShell page={page} />;
}
