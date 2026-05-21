"use client";

import dynamic from "next/dynamic";
import { DemoUserMenu } from "./UserMenu";

const ClerkUserButton = dynamic(
  () => import("@clerk/nextjs").then((m) => m.UserButton),
  { ssr: false },
);

export function UserButtonOrDemo({
  isDemo,
  demoName,
  demoEmail,
}: {
  isDemo: boolean;
  demoName: string;
  demoEmail: string;
}) {
  if (isDemo) {
    return <DemoUserMenu name={demoName} email={demoEmail} />;
  }
  return <ClerkUserButton afterSignOutUrl="/" />;
}
