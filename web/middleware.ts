import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
    apiAuthPrefix,
    publicRoutes,
} from "@/routes"
import { NextResponse } from "next/server";

const {auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

    if(isApiAuthRoute){
        return NextResponse.next()
    }

    if(isPublicRoute){
        return NextResponse.next()
    }

    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    //return NextResponse.next()
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  };
