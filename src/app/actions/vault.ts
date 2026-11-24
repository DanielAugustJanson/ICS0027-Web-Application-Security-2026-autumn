"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Persists the KDF salt to User and initializes an empty Vault record in PostgreSQL
 */
export async function initializeVaultAction(salt: string, initialData: string, initialIV: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.$transaction([
    // Save KDF Salt to User record
    prisma.user.update({
      where: { id: session.user.id },
      data: { kdfSalt: salt },
    }),
    //  Create or update Vault record
    prisma.vault.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        vaultData: initialData,
        vaultIV: initialIV,
      },
      update: {
        vaultData: initialData,
        vaultIV: initialIV,
      },
    }),
    //  Write security audit log
    prisma.logEntry.create({
      data: {
        userId: session.user.id,
        userAction: "VAULT_INITIALIZED",
        agentIP: "127.0.0.1",
      },
    }),
  ]);

  revalidatePath("/vault");
  return { success: true };
}

/**
 * Overwrites vaultData and vaultIV in PostgreSQL whenever the client vault changes
 */
export async function syncVaultAction(vaultData: string, vaultIV: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  await prisma.vault.update({
    where: { userId: session.user.id },
    data: {
      vaultData,
      vaultIV,
    },
  });

  return { success: true };
}