'use client'

import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export function SidebarSignIn() {
  return (
    <div className='flex flex-col items-center justify-start mt-16 w-full h-full'>
      <Button
        onClick={() =>
          signIn('spotify', {
            callbackUrl: `${process.env.NEXT_PUBLIC_URL!}/`
          })
        }
        className='rounded-full'
      >
        Sign in to view your library
      </Button>
    </div>
  )
}
