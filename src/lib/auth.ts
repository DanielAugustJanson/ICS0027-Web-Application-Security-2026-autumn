import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import prisma from "./prisma"
import { resumeToFizzStream } from "next/dist/server/app-render/stream-ops"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  session: {
    strategy: "jwt",
    maxAge: 5 * 60, //Age to 5min max
    //updateAge: 0 //If you want to disable automatic token refreshing
  },
  callbacks: {
    async signIn({ user }) {

      //cancel shit if email not existing
      if (!user.email) return false;

      //Check if user iexists
      try {
        const existingUser = await prisma.user.findUnique({
          where: {email: user.email}
        })

        //Case user doe not exist
        if (!existingUser) {

          //Check if any users exist on the database
          const userCount = await prisma.user.count();

          //If not, make this one admin
          const roleId = userCount === 0 ? 2 : 1;

          //If user ID is missing... We should fucking deny usage, what the fuck is this thing????
          const userId = user.id ?? `user_${Date.now()}`;

          //Create new user
          const newUser = await prisma.user.create({
            data: {
              id: userId,
              email: user.email,
              //If no username is attached with client, just take the forward part of their email.
              userName: user.name ?? user.email.split("@")[0],
              roleId: roleId,
            }
          })

          //Log registration
          await prisma.logEntry.create({
            data: {
              userId: newUser.id,
              userAction: `Reistered new user with roleID ${newUser.roleId}`,
              agentIP: "Localhost"
            }
          });
          //We assume user exists already:
        } else {

          //Log event for login
          await prisma.logEntry.create({
            data: {
              userId: existingUser.id,
              userAction: `User logged in`,
              agentIP: "Localhost"
            }
          })

        }
       return true
      } catch (error) {
          console.error("Error registering user in database", error)
        return false;
      }
    },

    //Dealing with Database fields and Tokens
    async jwt({ token, user }) {
      if (user && user.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
          include: { role: true }
        })

        if (dbUser) {
          token.userId = dbUser.id;
          token.roleId = dbUser.roleId;
          token.roleName = dbUser.role.roleName;
          token.rolePower = dbUser.role.rolePower;
        }
      }
      return token;
    },

    //Expose role and ID fields in session object returned by await auth()
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.userId as string;
        (session.user as any).roleName = token.roleName;
        (session.user as any).rolePower = token.rolePower;
      }
      return session;
    }
  }
})
