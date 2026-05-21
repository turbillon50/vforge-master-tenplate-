"use client";

import { motion } from "framer-motion";
import { MomentumMark } from "@/components/brand/MomentumLogo";
import { appConfig } from "@/config/app.config";

export function SplashScreen() {
  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent via-background/60 to-background" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-7 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="grid place-items-center animate-breathe"
        >
          <MomentumMark size={108} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="flex flex-col items-center gap-3"
        >
          <h1 className="text-display-1 text-chrome font-display tracking-tight">Momentum</h1>
          <p
            className="text-xs font-medium uppercase text-accent-electric"
            style={{ letterSpacing: "0.4em" }}
          >
            SaaS · Technology · Apps · Design
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-6 h-px w-40 bg-gradient-to-r from-transparent via-accent-electric/70 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="max-w-md text-sm text-on-surface-variant"
        >
          {appConfig.description.split(".")[0]}.
        </motion.p>
      </motion.div>
    </div>
  );
}
