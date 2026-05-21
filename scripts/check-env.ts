/**
 * Validate .env against .env.example.
 * Prints which required vars are missing for which integrations.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { integrationsConfig } from "../config/integrations.config";

function parseEnvFile(path: string): Record<string, string> {
  if (!existsSync(path)) return {};
  const content = readFileSync(path, "utf8");
  const map: Record<string, string> = {};
  for (const raw of content.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^"|"$/g, "");
    map[key] = value;
  }
  return map;
}

const cwd = process.cwd();
const env = { ...parseEnvFile(resolve(cwd, ".env.local")), ...process.env };
const example = parseEnvFile(resolve(cwd, ".env.example"));

let hasErrors = false;
console.log("Checking env vs .env.example...\n");

const requiredKeys = Object.values(integrationsConfig).flatMap((i) =>
  i.required ? i.envVars : [],
);

for (const key of requiredKeys) {
  if (!env[key]) {
    console.log(`  ❌ ${key} (required)`);
    hasErrors = true;
  } else {
    console.log(`  ✓ ${key}`);
  }
}

console.log("\nOptional integrations:");
for (const integ of Object.values(integrationsConfig).filter((i) => !i.required)) {
  const configured = integ.envVars.every((k) => env[k]);
  console.log(`  ${configured ? "✓" : "·"} ${integ.name} (${integ.envVars.join(", ")})`);
}

const orphans = Object.keys(env).filter(
  (k) => !example[k] && !["NODE_ENV", "PATH", "HOME"].some((b) => k === b),
);
if (orphans.length > 0 && process.env.SHOW_ORPHANS) {
  console.log(`\nEnv vars not in .env.example: ${orphans.length}`);
}

process.exit(hasErrors ? 1 : 0);
