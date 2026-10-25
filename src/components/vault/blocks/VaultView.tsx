import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemMedia } from "@/components/ui/item";
import { Button } from "@base-ui/react";

export default function VaultView(){

    return(
        <><Item>
            <ItemMedia>
                1
            </ItemMedia>
            <ItemContent>
                <ItemHeader>
                    Goole Account
                </ItemHeader>
                <ItemDescription>
                    
                </ItemDescription>
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
        </>
    )
}