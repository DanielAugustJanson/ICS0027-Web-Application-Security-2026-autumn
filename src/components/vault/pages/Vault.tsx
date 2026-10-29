"use client"

import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader } from "@/components/ui/item";
import { useState } from "react";
import DebugPanel from "./Vault/DebugPanel";
import SetupModal from "./Vault/SetupModal";
import UnlockModal from "./Vault/UnlockModal";

export default function Vault({ user, initialVault, masterKey, setMasterKey }: VaultProps) {
  const [currentSalt, setCurrentSalt] = useState<string | null>(user.kdfSalt);
  const [masterPassword, setMasterPassword] = useState("");
  const [vaultItems, setVaultItems] = useState<VaultItemInterface[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // 1. Initial Setup Handler (First Time User)
  const handleSetupMasterPassword = async (pass: string) => {
    setIsProcessing(true);
    try {
      setMasterPassword(pass);
      const simulatedSalt = "salt_" + Math.random().toString(36).substring(2, 15);
      
      setCurrentSalt(simulatedSalt);
      
      const dummyKey = await window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );
      
      setMasterKey(dummyKey);
    } catch (error) {
      console.error("Failed to setup master password:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // 2. Unlock Vault Handler (Returning User)
  const handleUnlockVault = async (pass: string) => {
    setIsProcessing(true);
    try {
      setMasterPassword(pass);
      const dummyKey = await window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );

      setMasterKey(dummyKey);
    } catch (error) {
      console.error("Failed to unlock vault:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <DebugPanel
        userId={user.id}
        currentSalt={currentSalt}
        masterKey={masterKey}
        hasVaultBlob={!!initialVault}
      />

      {!currentSalt && (
        <SetupModal onSetup={handleSetupMasterPassword} isProcessing={isProcessing} />
      )}

      {currentSalt && !masterKey && (
        <UnlockModal onUnlock={handleUnlockVault} isProcessing={isProcessing} />
      )}

      {masterKey && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Password Vault</h2>
            <Button className="cursor-pointer">+ Add Entry</Button>
          </div>

          {vaultItems.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">
              Your vault is currently empty. Click &quot;Add Entry&quot; to store a password.
            </p>
          ) : (
            vaultItems.map((item) => <VaultItem key={item.id} {...item} />)
          )}
        </div>
      )}
    </div>
  );
}

export interface VaultItemInterface{
    id: string;
    title: string;
    username: string;
    password: string;
    website: string;
    note: string;
    //metadata
    createdAt:Date;
    updatedAt:Date;
}

export interface VaultPropsInterface {
  user: {
    id: string;
    name: string;
    email: string;
    rolePower: number;
    kdfSalt: string | null;
  };
  initialVault: {
    vaultData: string;
    vaultIV: string;
  } | null;
  masterKey: CryptoKey | null;
  setMasterKey: (key: CryptoKey | null) => void;
}


export function VaultItemTemplate(){

    return((
        <Item className="border-accent-foreground my-3 b-3 h-64" key={"id"}>
            <ItemContent>
                <ItemHeader>
                  Google Account
                </ItemHeader>
                <ItemDescription>
                    <p>Created 26/10/2026</p>
                    <p>Modified 26/10/2026</p>
                </ItemDescription>
                <ItemContent>
                    <div className="my-3">
                        <div className="flex gap-3 my-3 blur-sm hover:blur-none">
                        <p>exampleUser</p>
                        <p>examplePassword</p>
                        <p>exampleWebsite.com</p>
                        </div>
                        <p>example note, lorem ipsum lalala</p>
                    </div>
                </ItemContent>
                
                <ItemActions>
                    <Button>
                        Edit
                    </Button>
                    <Button>
                        Delete
                    </Button>
                </ItemActions>
            </ItemContent>
        </Item>
    ))
}