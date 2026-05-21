import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { getLegalPage } from "@/services/legal.service";

export const metadata: Metadata = { title: "Play Store Policy" };

export default async function AndroidPolicyPage() {
  const page = await getLegalPage("android-policy");
  return <LegalShell page={page} />;
}
