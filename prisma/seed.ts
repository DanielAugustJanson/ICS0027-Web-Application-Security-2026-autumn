import { PrismaClient } from "../src/generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// Initialize Prisma with the pg adapter just like in your application
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  // 1. Create Default User Role (ID: 1, Power: 0)
  const userRole = await prisma.role.upsert({
    where: { roleName: "User" },
    update: {},
    create: {
      id: 1,
      roleName: "User",
      rolePower: 0,
    },
  });
  console.log(`Upserted Role: ${userRole.roleName}`);

  // 2. Create Administrator Role (ID: 2, Power: 1)
  const adminRole = await prisma.role.upsert({
    where: { roleName: "Admin" },
    update: {},
    create: {
      id: 2,
      roleName: "Admin",
      rolePower: 1,
    },
  });
  console.log(`Upserted Role: ${adminRole.roleName}`);

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
