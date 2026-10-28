// vault/page.tsx
import { auth, signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import VaultWrapper from "@/components/vault/VaultWrapper";

export default async function VaultPage() {

  const session = await auth()
  if (!session?.user?.id) {console.log("You are not logged in"); redirect("/auth")}


    //Find the user in our database and get it's corresponding vault data
    const dbUser = await prisma.user.findUnique({
      where: {id: session.user?.id },
      select:{
        kdfSalt: true,
        userName: true,
        email: true,
        role: {select:{rolePower: true}},
        vault:{
          select:{
            vaultData: true,
            vaultIV: true,
            creationDate: true,
            modificationDate: true,
          }
        }
      }
    })



  return (
      <VaultWrapper user={{
        id: session.user.id,
        name: dbUser?.userName ?? session.user.name ?? "User",
        email: dbUser?.email ?? "",
        image: session.user.image ?? "",
        rolePower: dbUser?.role?.rolePower ?? 0,
        kdfSalt: dbUser?.kdfSalt ?? null,
      }}
      initialVault={dbUser?.vault ?? null}
      />   
    )
}
