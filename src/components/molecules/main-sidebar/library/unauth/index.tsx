'use client'

import { signIn } from 'next-auth/react'

import { useAtom } from 'jotai'

import { sessionAtom } from '@/lib/atoms'

import { Button } from '@/components/ui/button'

export function SidebarSignIn() {
  const [session] = useAtom(sessionAtom)
  if (session) return null
  return (
    <div className='flex flex-col items-center justify-start mt-16 w-full h-full'>
      <Button onClick={() => signIn()} className='rounded-full'>
        Sign in to view your library
      </Button>
    </div>
  )
}
