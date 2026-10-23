import Authenticate from "@/components/pages/Authenticate";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function AuthenticatePage() {

  const session = await auth()
  if (session) redirect("/vault")

  return (
    <div className="flex min-h-screen w-screen justify-center items-center bg-accent">
      <Authenticate/>
    </div>
  )
}
