import { AdminStubPage } from "@/components/admin/AdminStubPage";

export default function KnowledgeAdminPage() {
  return (
    <AdminStubPage
      title="Knowledge Center"
      description="Articles, tutorials, onboarding flows and the source-of-truth library."
      capabilities={[
        "Rich text articles with categories",
        "Onboarding flows + tooltips",
        "Search-indexed for in-app help",
        "Public at /knowledge, gated articles inside /app/help",
      ]}
    />
  );
}
