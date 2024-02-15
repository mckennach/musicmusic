'use client'

import React, { useEffect } from 'react'

import Link from 'next/link'

import { cn } from '@/lib/utils'

import { DeviceModal } from '@/components/molecules/devices/device-modal'
import { buttonVariants } from '@/components/ui/button'
import { availableDevicesAtom, deviceModalOpenAtom } from '@/lib/atoms'
import spotifySdk from '@/lib/spotify-sdk'
import { useAtom } from 'jotai'
interface NoDeviceProps extends React.HTMLAttributes<HTMLDivElement> {}

const NoDevice = React.forwardRef<HTMLDivElement, NoDeviceProps>(
  ({ className, ...props }, ref) => {
    const [modalOpen, setModalOpen] = useAtom(deviceModalOpenAtom)
    const [availableDevices, setAvailableDevices] =
      useAtom(availableDevicesAtom)

    useEffect(() => {
      if (availableDevices && availableDevices?.length > 0) {
        setModalOpen(true)
      }
    }, [availableDevices, setModalOpen])

    const handleButtonClick = (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
      e.preventDefault()
      if (availableDevices && availableDevices?.length > 0) {
        setModalOpen(true)
      } else {
        window.open('https://open.spotify.com/', '_blank')
        setTimeout(() => {
          spotifySdk.player.getAvailableDevices().then((devices) => {
            setAvailableDevices(devices.devices)
            setModalOpen(true)
          })
        }, 1000)
      }
    }

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
            onClick={(e) => handleButtonClick(e)}
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
