import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight'
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

const ResponseViewer = ({ code }: { code: string }) => {
    return (
        <ScrollArea className='relative'>
            <div className='rounded-md overflow-hidden'>
                <SyntaxHighlighter language="json" style={githubGist} customStyle={{
                    padding: "25px",
                }}>
                    {code}
                </SyntaxHighlighter>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    )
}

export default ResponseViewer