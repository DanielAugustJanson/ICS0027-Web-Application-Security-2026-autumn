import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function VaultPage() {

  const session = await auth()
  if (session) redirect("/auth")

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <div className="rounded-2xl text-2xl p-3 text-center m-3">
          <h1>Locky V3</h1>
          {
            /*
            <Avatar>
              <AvatarImage src="https://picsum.photos" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            */
          }
        </div>
            <SidebarContent>
              <SidebarGroup />
              <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
      </Sidebar>
    <main>

    </main>
    </SidebarProvider>
    )
}





/*
<div className="container mx-auto">
  <Card className="container">
    <CardHeader>
      <CardTitle>The Vault</CardTitle>
      <CardDescription>Welcome back</CardDescription>
    </CardHeader>
  </Card>
</div>
*/
