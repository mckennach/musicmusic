'use client'

import { signIn } from 'next-auth/react'

import React from 'react'

import { Button } from '@/components/ui/button'

interface PlayerUnauthorizedProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const PlayerUnauthorized = React.forwardRef<
  HTMLDivElement,
  PlayerUnauthorizedProps
>(({ className, ...props }, ref) => {
  return (
    <div className='unauthorized-bg flex h-full w-full items-center justify-between p-4'>
      <div>
        <h3 className='text-2xl font-bold'>Spotify</h3>
        <p className='text-base'>Connect to Spotify to play music</p>
      </div>
      <Button className='rounded-full' onClick={() => signIn()}>
        Sign in to Spotify
      </Button>
    </div>
  )
})

PlayerUnauthorized.displayName = 'PlayerUnauthorized'

export { PlayerUnauthorized }
