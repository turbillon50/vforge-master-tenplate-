import type { Metadata } from "next";
import { SplashScreen } from "@/components/splash/SplashScreen";

export const metadata: Metadata = { title: "Splash" };

export default function SplashRoute() {
  return <SplashScreen />;
}
