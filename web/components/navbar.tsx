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
            </nav>
        </div>
    )
}

export default NavBar