import React from 'react'
import { Button } from '@/components/ui/button'
import { ClipboardIcon } from '@radix-ui/react-icons'

const TokenViewer = ({ token }: { token: string }) => {
    const onClick = () => {
        navigator.clipboard.writeText(token)
    }

    return (
        <div className='flex items-center bg-slate-500 text-white p-3 rounded-md'>
            <div className='flex flex-1'>
                <div className='w-full'>{token}</div>
            </div>
            <Button
                onClick={onClick}
                size={"icon"}
                className='bg-[#2e333d] drop-shadow-md'>
                <ClipboardIcon className='w-4 h-4' />
            </Button>

        </div>
    )
}

export default TokenViewer