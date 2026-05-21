import { AdminStubPage } from "@/components/admin/AdminStubPage";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function UsersAdminPage() {
  return (
    <AdminStubPage
      title="Users"
      description="Manage users, roles, permissions, suspension."
      capabilities={[
        "List + filter by role, group, status, tag",
        "Edit role + per-user permission overrides",
        "Suspend / unsuspend with reason",
        "Activity history per user",
      ]}
    >
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardContent className="p-10 text-center text-sm text-on-surface-variant">
              User list connects to Clerk + the local `users` table when DATABASE_URL is set.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="admins">
          <Card>
            <CardContent className="p-10 text-center text-sm text-on-surface-variant">
              Filtered by role = admin / super_admin.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="suspended">
          <Card>
            <CardContent className="p-10 text-center text-sm text-on-surface-variant">
              Filtered by suspended = true.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending">
          <Card>
            <CardContent className="p-10 text-center text-sm text-on-surface-variant">
              Awaiting onboarding / verification.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminStubPage>
  );
}
