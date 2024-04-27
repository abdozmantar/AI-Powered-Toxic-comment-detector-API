"use client"

import Code from '@/components/home/code'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface Props {
    code: string
}

const CodeReviwer = ({ code }: Props) => {
    return (
        <ScrollArea className='relative'>
            <Code code={code} />
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

export default CodeReviwer