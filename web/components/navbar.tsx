/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Button } from './ui/button'
import { HeartFilledIcon, StarFilledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import Link from 'next/link'

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
})

const NavBar = () => {
    return (
        <div className='w-full flex items-center justify-center py-4 px-3 bg-base-100'>
            <nav className='w-full max-w-5xl flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Image src={"/logo.png"} alt='Logo' width={30} height={30} className='w-7 h-7' />
                    <p className={cn("text-md font-semibold text-orange", font.className)}>HateHoundAPI</p>
                </div>
                <div className='flex flex-col gap-2 items-center md:flex-row md:gap-0'>
                    <div>
                        <a href="https://www.producthunt.com/posts/hatehoundapi?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-hatehoundapi" target="_blank">
                            <img
                                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=455347&theme=neutral"
                                alt="HateHoundAPI - AI&#0032;Powered&#0032;Toxic&#0032;comment&#0032;detector&#0032;API | Product Hunt"
                                style={{ width: "250px", height: "40px" }} width="250" height="40" />
                        </a>
                    </div>
                    <div>
                        <Link href={"https://github.com/abdozmantar/Toxic-comment-detector-AI"} target='_blank'>
                            <Button variant={"default"} className='bg-base-200 hover:bg-base-300'>
                                <StarFilledIcon className='w-4 h-4 mr-1 text-yellow-400' />
                                <span className="text-base-content">
                                    Star on GitHub
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar