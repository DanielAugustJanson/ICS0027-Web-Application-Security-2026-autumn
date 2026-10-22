import  prisma  from "@/lib/prisma";

export default async function Home() {
  // Query database to test connection
  const userCount = await prisma.user.count();

  return (
    <div className="p-8">
      <h1>LockyV3 Database Test</h1>
      <p>Total users in PostgreSQL: {userCount}</p>
    </div>
  );
}
