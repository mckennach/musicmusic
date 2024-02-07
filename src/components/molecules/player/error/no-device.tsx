'use client'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils'

import { buttonVariants } from '@/components/ui/button'
import { DeviceModal } from '@/components/ui/device-modal'
import { availableDevicesAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
interface NoDeviceProps extends React.HTMLAttributes<HTMLDivElement> {}

const NoDevice = React.forwardRef<HTMLDivElement, NoDeviceProps>(
  ({ className, ...props }, ref) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [availableDevices] = useAtom(availableDevicesAtom)

    useEffect(() => {
      if (availableDevices && availableDevices?.length > 0) {
        setModalOpen(true)
      }
    }, [availableDevices])

    return (
      <>
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
            onClick={(e) => {
              if (availableDevices && availableDevices?.length > 0) {
                e.preventDefault()
              }
            }}
            className={cn(buttonVariants({ className: 'rounded-full' }))}
          >
            Open Spotify
          </Link>
        </div>
        <DeviceModal open={modalOpen} />
      </>
    )
  }
)

NoDevice.displayName = 'NoDevice'

export { NoDevice }
