"use client";

import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader } from "@/components/ui/item";

export interface VaultItemInterface {
  id: string;
  title: string;
  username: string;
  password: string;
  website: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
}

export function VaultItem(data: VaultItemInterface) {
  return (
    <Item className="border-accent-foreground my-3 b-3">
      <ItemContent>
        <ItemHeader>{data.title}</ItemHeader>
        <ItemDescription>
          <p>Created: {new Date(data.createdAt).toLocaleDateString()}</p>
        </ItemDescription>
        <ItemContent>
          <div className="my-3">
            <div className="flex gap-3 my-3 blur-sm hover:blur-none transition-all cursor-pointer">
              <p><strong>User:</strong> {data.username}</p>
              <p><strong>Pass:</strong> {data.password}</p>
              <p><strong>URL:</strong> {data.website}</p>
            </div>
            <p className="text-sm text-muted-foreground">{data.note}</p>
          </div>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="destructive" size="sm">Delete</Button>
        </ItemActions>
      </ItemContent>
    </Item>
  );
}