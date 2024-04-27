"use client"

import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { signIn, signOut } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { CheckCircledIcon, ExitIcon, GitHubLogoIcon, SymbolIcon } from "@radix-ui/react-icons";
import CodeReviwer from "@/components/home/code-reviwer";
import { useCurrentUser } from "@/hooks/use-current-user";
import NavBar from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_TEST_URL, API_URL } from "@/constant";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import ResponseViewer from "@/components/home/response-viewer";
import { cn } from "@/lib/utils";
import TokenViewer from "@/components/home/token-viewer";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

const codeBlock = `const res = await fetch("${API_URL}", {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ comment , access_token}),
})`

export default function Home() {
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const [isPending, startTransition] = useTransition();
  const user = useCurrentUser();
  const onClick = (provider: "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  const Test = (comment: string) => {

    startTransition(async () => {
      const res = await fetch(API_TEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment })
      })
      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    })
  }

  //bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800
  return (
    <>
      <NavBar />
      <main className="flex flex-col bg-slate-200/50">
        <section className="w-full flex flex-col items-center flex-wrap justify-center p-5 md:p-20 gap-5 xl:flex-row xl:items-start">
          <div className="max-w-md flex flex-col gap-2">
            <h1 className="font-bold text-4xl text-orange-600">HateHoundAPI</h1>
            <h4 className="font-bold text-zinc-900/60">Your Fast, Free, AI-Powered Toxic Content Detector</h4>

            <p className="text-zinc-700">Detecting toxic content has traditionally been slow and costly. But not anymore. With HateHoundAPI, you can now swiftly identify and filter out toxic content in your web applications.
              Powered by state-of-the-art AI technology, HateHoundAPI offers:</p>
            <div className="flex flex-col gap-2 bg-slate-500/10 p-3 rounded-md">
              <div className="flex items-center gap-2">
                <CheckCircledIcon className="w-6 h-6 text-orange-600" />
                <span className={cn("text-md text-gray-900 drop-shadow-md", font.className)}>Lightning-fast detection</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-slate-500/10 p-3 rounded-md">
              <div className="flex items-center gap-2">
                <CheckCircledIcon className="w-6 h-6 text-orange-600" />
                <span className={cn("text-md text-gray-900 drop-shadow-md", font.className)}>High accuracy rates</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-slate-500/10 p-3 rounded-md">
              <div className="flex items-center gap-2">
                <CheckCircledIcon className="w-6 h-6 text-orange-600" />
                <span className={cn("text-md text-gray-900 drop-shadow-md", font.className)}>100% free and open-source</span>
              </div>
            </div>
            <p className="text-zinc-700">Say goodbye to slow and expensive moderation processes. Embrace HateHoundAPI for efficient, and reliable toxic content detection in real-time.</p>
          </div>
          <Card className="w-full max-w-lg bg-slate-400/10 shadow-none border-2 border-gray-500/10 mt-9">
            <CardHeader>
              <CardTitle className={"text-lg font-semibold text-center"}>
                {"Try It"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex w-full items-center gap-3">
                <div className="p-2 bg-orange-950 rounded-md text-white text-sm font-semibold">
                  POST
                </div>
                <div>
                  <p className="font-semibold">{API_TEST_URL}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Input
                  disabled={isPending}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="bg-white"
                  required
                />
              </div>
              <div className="flex items-center ">
                <Button
                  disabled={isPending || value.length == 0}
                  onClick={() => Test(value)}
                  variant={"destructive"}
                  className="w-full" >
                  {isPending ? (
                    <SymbolIcon className="animate-spin w-5 h-5" />
                  ) : (
                    "Let's Try"
                  )
                  }

                </Button>
              </div>
              {response &&
                <ResponseViewer code={response} />
              }
            </CardContent>
          </Card>
        </section>
        <section className="w-full flex justify-center p-8 bg-white">
          <div className=" flex flex-col justify-center space-y-6 text-center space-x-4">
            <div className="flex justify-center items-center gap-2">
              <GitHubLogoIcon className="w-9 h-9" />
              <h1 className={cn("text-4xl font-semibold text-gray-900 drop-shadow-md", font.className)}>
                {"GITHUB"}
              </h1>
            </div>
            <div className="leading-tight">
              <p>
                Get your special <span className="bg-slate-800 text-white px-1">access_token</span> by connecting your github and start using our API
              </p>
            </div>
            {
              user ? (
                <>
                  <TokenViewer token={user?.access_token as string} />
                  <Button
                    onClick={() => signOut()}
                    variant={"secondary"}
                    size={"lg"}
                  >
                    <ExitIcon className="w-5 h-5 mr-1" />
                    Sign out
                  </Button>
                </>
              )
                :
                <Button
                  onClick={() => onClick("github")}
                  variant={"default"}
                  size={"lg"}
                >
                  <GitHubLogoIcon className="w-5 h-5 mr-1" />
                  Connect
                </Button>

            }

          </div>
        </section>
        <section className="w-full flex justify-center py-20">
          <div
            id='api'
            className='flex text-center flex-col gap-12 px-4'>
            <p className={cn("text-4xl font-semibold text-gray-900 drop-shadow-md", font.className)}>Try our API</p>
            <CodeReviwer code={codeBlock} />
          </div>
        </section>
      </main>
      <footer className="py-5">
        <p className="text-center text-gray-500">
          <a href="">All right reserved by abdullah ozmantar</a>
        </p>
      </footer>
    </>
  );
}
