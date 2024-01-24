'use client'

import React from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Button, buttonVariants } from '@/components/ui/button'

interface NoDeviceProps extends React.HTMLAttributes<HTMLDivElement> {}

const NoDevice = React.forwardRef<HTMLDivElement, NoDeviceProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className='unauthorized-bg flex h-full w-full items-center justify-between p-4'>
        <div>
          <h3 className='text-2xl font-bold'>No Device!</h3>
          <p className='text-base'>
            Open Spotify and play a track to activate device
          </p>
        </div>
        <Link
          href='https://open.spotify.com/'
          target='_blank'
          className={cn(buttonVariants({ className: 'rounded-full' }))}
        >
          Open Spotify
        </Link>
      </div>
    )
  }
)

NoDevice.displayName = 'NoDevice'

export { NoDevice }
