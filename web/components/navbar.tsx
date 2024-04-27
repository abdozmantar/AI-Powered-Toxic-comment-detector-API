import React from 'react'
import { Button } from './ui/button'
import { HeartFilledIcon, StarFilledIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
})

const NavBar = () => {
    return (
        <div className='w-full flex items-center justify-center border-b-2 border-gray-300 py-4 px-3 '>
            <nav className='w-full max-w-7xl flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Image src={"/logo.png"} alt='Logo' width={40} height={40} className='w-10 h-10' />
                    <p className={cn("text-xl font-semibold text-orange-600", font.className)}>HateHoundAPI</p>
                </div>
                <div>
                    <Button variant={"ghost"} className='bg-slate-200'>
                        <StarFilledIcon className='w-4 h-4 mr-1 text-yellow-400' />
                        <span className='text-stone-600'>
                            Star on GitHub
                        </span>
                    </Button>
                </div>
            </nav>
        </div>
    )
}

export default NavBar