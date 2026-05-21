"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { appConfig } from "@/config/app.config";

export function SplashScreen() {
  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent via-background/60 to-background" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="grid h-20 w-20 place-items-center rounded-2xl border border-border bg-surface/60 shadow-glow backdrop-blur-xl"
        >
          <Sparkles className="h-9 w-9 text-accent-violet animate-breathe" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <h1 className="text-display-1 text-gradient font-display">{appConfig.name}</h1>
          <p className="text-sm text-on-surface-variant">
            {appConfig.description.split(".")[0]}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 h-px w-32 bg-gradient-to-r from-transparent via-accent-violet/70 to-transparent"
        />
      </motion.div>
    </div>
  );
}
