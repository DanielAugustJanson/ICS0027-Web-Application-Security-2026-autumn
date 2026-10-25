
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";
import SideMenu from "@/components/vault/SideMenu";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function VaultPage() {

  const session = await auth()
  if (!session) redirect("/auth")

  return (
    <SidebarProvider>
      <SideMenu/>
      { /* Main Content here */ }
      <main className="w-screen">
        <div className="container mx-auto">
          <Card className="container">
            <CardHeader>
              <CardTitle>The Vault</CardTitle>
              <CardDescription>{ }</CardDescription>
            </CardHeader>
          </Card>
        </div>
    </main>
    </SidebarProvider>
    )
}





/*

*/
