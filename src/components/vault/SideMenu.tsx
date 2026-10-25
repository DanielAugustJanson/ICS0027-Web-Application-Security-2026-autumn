import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";
import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SideMenu(){

    const session = await auth()
      if (!session) redirect("/auth")

    return (
        <Sidebar>
        <SidebarHeader />
        <div className="rounded-2xl text-2xl p-3 text-center m-3">
          <h1>Locky V3</h1>
        </div>
            <SidebarContent>
              <SidebarGroup />
                <Button>Vault<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
  <path d="M0 0h24v24H0z" fill="none" />
  <path fill="#fff" d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22" />
</svg></Button>
                <Button>Settings<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
  <path d="M0 0h16v16H0z" fill="none" />
  <path fill="#fff" d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86a2.929 2.929 0 0 1 0 5.858z" />
</svg></Button>
              <SidebarGroup />
              <SidebarGroup>
                <Button>Monitoring<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
	<path d="M0 0h512v512H0z" fill="none" />
	<path fill="#fff" fill-rule="evenodd" d="M309.334 192c64.801 0 117.333 52.532 117.333 117.333c0 24.694-7.628 47.605-20.656 66.507l59.884 59.885l-30.17 30.17l-59.884-59.884c-18.903 13.028-41.814 20.656-66.507 20.656c-64.802 0-117.334-52.532-117.334-117.334C192 244.532 244.532 192 309.334 192m0 42.667c-41.238 0-74.667 33.43-74.667 74.666c0 41.238 33.43 74.667 74.667 74.667S384 350.57 384 309.333s-33.43-74.666-74.666-74.666M171.07 298.666q-.403 5.282-.404 10.667c0 11.015 1.284 21.729 3.71 32.002l-131.71-.002v-42.666zM128.001 64v213.333H64V64zm85.333 85.333l-.003 59.94c-18.93 18.168-32.716 41.655-38.953 68.059l-25.044.001v-128zm85.333-42.666v64.404a137.85 137.85 0 0 0-64 21.395v-85.8zM384 128l.001 64.466a137.85 137.85 0 0 0-64-21.395V128z" />
</svg>
</Button>
                <Button>Users<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="#fff" d="M12 2a5 5 0 1 0 0 10a5 5 0 1 0 0-10M4 22h16c.55 0 1-.45 1-1v-1c0-3.86-3.14-7-7-7h-4c-3.86 0-7 3.14-7 7v1c0 .55.45 1 1 1" />
</svg>
</Button>
              </SidebarGroup>
            </SidebarContent>
        <SidebarFooter>
          <Avatar>
            <AvatarImage src={session.user?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button  onClick={async () => {
            "use server"
            await signOut()
            }} >Sing out</Button>
          </SidebarFooter>
      </Sidebar>
    )
}