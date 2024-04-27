import NextAuth, { DefaultSession } from "next-auth"
import { db } from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config"
import { getUserById } from "./data/user"

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
      user: {
        access_token?: string
      } & DefaultSession["user"]
    }
  }


export const { 
    handlers, 
    signIn, 
    signOut, 
    auth } = NextAuth({
        callbacks:{
            async session({token, session}){
                if(token.sub && session.user){
                    session.user.id = token.sub
                }

                if(session.user){
                    session.user.access_token = token.access_token as string
                }

                return session
            },
            async jwt({token}){
                if(!token.sub) return token
                const existingUser = await getUserById(token.sub)
                if(!existingUser) return token
                token.access_token = existingUser.access_token

                return token
            }
        },
        adapter: PrismaAdapter(db),
        session: { strategy: "jwt"},
        ...authConfig,
})