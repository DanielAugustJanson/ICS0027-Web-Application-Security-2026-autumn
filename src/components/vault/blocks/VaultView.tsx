"use client"

import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemMedia } from "@/components/ui/item";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export default function VaultView(){

    const [vaultItems, setVaultItems] = useState()
    const [openCard, setOpenCard] = useState(false)

    return(
        <>
        {VaultItem()}
        </>
    )
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

export function EditVaultItem(){
    
}


export function VaultItem(){

    return((
        <Item className="border-accent-foreground my-3 b-3">
            <ItemContent>
                <ItemHeader>
                    Goole Account
                </ItemHeader>
                <ItemContent>
                    <div className="my-3">
                        <div className="flex gap-3 my-3 blur-sm hover:blur-none">
                        <p>Username</p>
                        <p>Password</p>
                        <p>https://google.com</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
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
