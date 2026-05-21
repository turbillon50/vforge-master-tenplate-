import { ModulePlaceholder } from "@/components/app-shell/ModulePlaceholder";

export default function AIPage() {
  return (
    <ModulePlaceholder
      title="AI Copilot"
      category="ai"
      description="OpenRouter chat, prompt library, assistants. Every call is metered into usage_ledger + ai_usage_events for resale."
      bullets={["Multi-provider routing", "Per-user credits + rate limits", "Prompts library reusable across modules"]}
    />
  );
}
