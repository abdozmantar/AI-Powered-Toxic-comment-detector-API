'use client'

import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Button } from '../ui/button';
import { ClipboardIcon } from '@radix-ui/react-icons';

const Code = ({ code }: { code: string }) => {
  const onClick = () => {
    navigator.clipboard.writeText(code)
  }
  return (
    <div className='text-left max-w-xs sm:max-w-md md:max-w-2xl bg-neutral rounded-md overflow-hidden'>
      <div className='flex justify-between px-4 py-2 text-neutral-content text-xs items-center'>
        <p className='text-sm'>Example Code</p>
        <Button
          onClick={onClick}
          size={"icon"}
          className='bg-base-100 hover:bg-base-200 drop-shadow-md'>
          <ClipboardIcon className='w-4 h-4' />
        </Button>
      </div>
      <SyntaxHighlighter language="typescript" style={atomOneDark} customStyle={{
        padding: "25px",
      }}>
        {code}
      </SyntaxHighlighter>
    </div>

  )
}

export default Code