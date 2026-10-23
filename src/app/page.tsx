import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import  prisma  from "@/lib/prisma";
import { Button } from "@base-ui/react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="container mx-auto min-h-screen flex justify-center items-center">
      <Card className="w-xl bg-accent">
        <CardHeader>
          <CardTitle className="text-6xl">Locky V3</CardTitle>
          <CardDescription>The prime password manager</CardDescription>
        </CardHeader>
        <CardContent>
            <Button className="cursor-pointer bg-accent-foreground rounded-2xl p-2" >
              <Link href="/auth">Enter Locky</Link>
            </Button>
        </CardContent>
      </Card>


    </div>
  );
}
