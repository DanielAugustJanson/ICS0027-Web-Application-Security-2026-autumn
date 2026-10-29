"use client"

import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemMedia } from "@/components/ui/item";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import { SidebarProvider } from "../ui/sidebar";
import SideMenu from "./SideMenu";
import Settings from "./pages/Settings";
import Vault from "./pages/Vault";
import Monitor from "./pages/Monitor";
import Administration from "./pages/Administration";

export type ViewType = "vault" | "settings" | "monitor" | "users";

export default function VaultWrapper({ user, initialVault }: VaultWrapperInterface){

    const [activeTab, setActiveTab] = useState<ViewType>("vault");
    const [masterKey, setMasterKey] = useState<CryptoKey | null>(null);

    return(
        <>
        <SidebarProvider>
        <SideMenu
            user={user}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
      />
        <main className="flex bg-background">
            {activeTab === "vault" && (
          <Vault
            user={user}
            initialVault={initialVault}
            masterKey={masterKey}
            setMasterKey={setMasterKey}
          />
        )}
        {activeTab === "settings" && <Settings />} 
        {activeTab === "monitor" && user.rolePower >= 1 && <Monitor  />}
        {activeTab === "users" && user.rolePower >= 1 && <Administration/>}
        </main>
      
         </SidebarProvider>
        </>
    )
}

export interface VaultWrapperInterface{
    user: {
    id: string;
    name: string;
    email: string;
    image: string;
    rolePower: number;
    kdfSalt: string | null;
  };
  initialVault: {
    vaultData: string;
    vaultIV: string;
  } | null;
}


