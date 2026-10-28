"use client"

import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader } from "@/components/ui/item";
import { useState } from "react";

export default function Vault(){



    type vaultView = "vault" | "setup" | "edit" | "create";
    const [vaultTab, setVaultTab] = useState<vaultView>("vault")

    

    return <>
    </>
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


export function VaultItem(data: VaultItemInterface){

    return((
        <Item className="border-accent-foreground my-3 b-3" key={"id"}>
            <ItemContent>
                <ItemHeader>
                   {data.title}
                </ItemHeader>
                <ItemDescription>
                    <p>{data.createdAt}</p>
                    <p>{data.updatedAt}</p>
                </ItemDescription>
                <ItemContent>
                    <div className="my-3">
                        <div className="flex gap-3 my-3 blur-sm hover:blur-none">
                        <p>{data.username}</p>
                        <p>{data.password}</p>
                        <p>{data.website}</p>
                        </div>
                        <p>{data.note}</p>
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