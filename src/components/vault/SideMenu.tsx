"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";
import { signOut } from "next-auth/react";
import { ViewType } from "./VaultWrapper";

interface SideMenuInterface {
  user: {
    name: string;
    image: string;
    rolePower: number;
  };
  activeTab: ViewType;
  setActiveTab: (tab: ViewType) => void;
}

export default function SideMenu({ user, activeTab, setActiveTab }: SideMenuInterface) {

    return (
        <Sidebar>
        <SidebarHeader />
        <div className="rounded-2xl text-2xl p-3 text-center m-3">
          <h1>Locky V3</h1>
        </div>
            <SidebarContent>
        <SidebarGroup className="space-y-2">
          <Button
            variant={activeTab === "vault" ? "default" : "ghost"}
            className="w-full justify-start cursor-pointer"
            onClick={() => setActiveTab("vault")}
          >
            Vault
          </Button>

          <Button
            variant={activeTab === "settings" ? "default" : "ghost"}
            className="w-full justify-start cursor-pointer"
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </Button>

          <Button
            variant={activeTab === "monitor" ? "default" : "ghost"}
            className="w-full justify-start cursor-pointer"
            onClick={() => setActiveTab("monitor")}
          >
            Monitoring
          </Button>

          {user.rolePower >= 1 && (
            <Button
              variant={activeTab === "users" ? "default" : "ghost"}
              className="w-full justify-start cursor-pointer"
              onClick={() => setActiveTab("users")}
            >
              Users
            </Button>
          )}
        </SidebarGroup>
      </SidebarContent>
        <SidebarFooter>
          <Avatar>
            <AvatarImage src={user?.image}/>
            <AvatarFallback>{user.name ? user.name[0] : "U"}</AvatarFallback>
          </Avatar>
          <Button
          variant="destructive"
          className="w-full cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/auth" })}
        >
          Sign Out
        </Button>
          </SidebarFooter>
      </Sidebar>
    )
}