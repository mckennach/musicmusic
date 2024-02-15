'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import {
  activeDeviceAtom,
  deviceModalOpenAtom,
  playbackStateAtom
} from '@/lib/atoms'
import spotifySdk from '@/lib/spotify-sdk'
import { cn } from '@/lib/utils'
import { transferPlayback } from '@/services/server'
import { AuthSession } from '@/types/database.ds'
import { Device, PlaybackState } from '@spotify/web-api-ts-sdk'
import { useAtom } from 'jotai'
import { Laptop2, Loader2, Smartphone, Speaker } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
interface DeviceButtonProps extends ButtonProps {
  device: Device
  iconSize?: number
  contextUri?: string
}

const DeviceButton = React.forwardRef<HTMLButtonElement, DeviceButtonProps>(
  ({ className, iconSize = 19, device, ...props }, ref) => {
    const router = useRouter()
    const { data: session } = useSession()
    const [playbackState, setPlaybackState] = useAtom(playbackStateAtom)
    const [activeDevice, setActiveDevice] = useAtom(activeDeviceAtom)
    const [deviceModalOpen, setDeviceModalOpen] = useAtom(deviceModalOpenAtom)
    const [isLoading, setIsLoading] = useState(false)
    const handleClick = async () => {
      setIsLoading(true)
      if (device && device.id) {
        const transfer = await transferPlayback(
          session as AuthSession,
          [device.id],
          false
        )
        if (transfer) {
          setTimeout(() => {
            spotifySdk.player.getPlaybackState().then((playback) => {
              setPlaybackState(playback as PlaybackState)
              if (playback.device.is_active) {
                setActiveDevice(playback.device)
                setIsLoading(false)
                setDeviceModalOpen(false)
                // router.refresh();
              }
            })
          }, 1000)
        } else {
          setIsLoading(false)
          toast.error('Failed to transfer playback')
        }
      }
    }
    return (
      <Button
        ref={ref}
        onClick={handleClick}
        className={cn('', className)}
        {...props}
        disabled={isLoading}
      >
        {isLoading && <Loader2 size={iconSize} className='animate-spin' />}
        {device.type === 'Computer' && !isLoading && (
          <Laptop2 size={iconSize} />
        )}
        {device.type === 'Smartphone' && !isLoading && (
          <Smartphone size={iconSize} />
        )}
        {device.type === 'Speaker' && !isLoading && <Speaker size={iconSize} />}
        {device.name}
      </Button>
    )
  }
)

DeviceButton.displayName = 'DeviceButton'

export { DeviceButton }
