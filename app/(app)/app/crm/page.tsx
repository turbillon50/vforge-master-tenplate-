import { ModulePlaceholder } from "@/components/app-shell/ModulePlaceholder";

export default function CRMPage() {
  return (
    <ModulePlaceholder
      title="CRM"
      category="growth"
      description="Contacts, deals, pipelines, activity timeline per contact."
      bullets={["Contacts with tags + groups", "Deals with pipeline stages", "Activity feed per contact"]}
    />
  );
}
