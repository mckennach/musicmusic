import React, { useEffect } from 'react'

import { useAtom } from 'jotai'

// import Icon from '@/components/ui/icon'
import {
  activeDeviceAtom,
  activeDeviceTypeAtom,
  asyncAvailableDevicesAtom,
  availableDevicesAtom,
  isPlayingAtom,
  playbackStateAtom
} from '@/lib/atoms'
import spotify from '@/lib/spotify-sdk'
import { cn } from '@/lib/utils'

import { Laptop2, MonitorSpeaker, Smartphone, Speaker } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface DevicesButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const DevicesButton = React.forwardRef<HTMLButtonElement, DevicesButtonProps>(
  ({ className, ...props }, ref) => {
    const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom)
    const [availableDevices] = useAtom(availableDevicesAtom)
    const [activeDevice, setActiveDevice] = useAtom(activeDeviceAtom)
    const [activeDeviceType, setActiveDeviceType] =
      useAtom(activeDeviceTypeAtom)
    const [playbackState, setPlaybackState] = useAtom(playbackStateAtom)
    const [, syncActiveDevice] = useAtom(asyncAvailableDevicesAtom)

    useEffect(() => {
      ;(async () => {
        if (playbackState && playbackState.device) {
          if (activeDevice && playbackState.device.id !== activeDevice.id) {
            // await syncActiveDevice()
          }
        }
      })()
    }, [playbackState, activeDevice, syncActiveDevice])

    const handleDeviceChange = async (device: SpotifyApi.UserDevice) => {
      if (device && device.id) {
        await spotify.player.transferPlayback([device.id], isPlaying)
        await syncActiveDevice()
      }
    }

    return (
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                // onClick={() => setDevicesButtonState(!DevicesButtonState)}
                ref={ref}
                size='icon'
                {...props}
                className={cn(
                  `h-8 w-8 rounded-full p-2 outline-none focus:outline-none focus-visible:ring-offset-[unset] focus-visible:ring-[unset]`,
                  `bg-transparent text-foreground opacity-70 hover:bg-transparent hover:opacity-100 active:bg-transparent`,
                  activeDeviceType !== 'no-device' &&
                    'text-spotify opacity-100 hover:scale-100',
                  activeDeviceType !== 'no-device' &&
                    'after:absolute after:bottom-0 after:left-1/2 after:z-[-1] after:h-1 after:w-1 after:translate-x-[-50%] after:rounded-full after:bg-spotify after:opacity-100'
                )}
                scale={true}
              >
                {activeDeviceType === 'no-device' && (
                  <MonitorSpeaker size={16} />
                )}
                {activeDeviceType === 'computer' && <Laptop2 size={16} />}
                {activeDeviceType === 'smartphone' && <Smartphone size={16} />}
                {activeDeviceType === 'speaker' && <Speaker size={16} />}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side='top' align='center'>
            Connect to a device
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent className='space-y-1' side='top' align='center'>
          <DropdownMenuLabel>
            <h4 className='text-md font-bold'>Current device</h4>
            <p className='text-xs text-spotify font-normal'>
              {activeDevice?.name}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuLabel className='text-xs text-subdued'>
            Select another device
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {availableDevices &&
              availableDevices.length > 0 &&
              availableDevices
                .filter((device) => !device.is_active)
                .map((device) => (
                  <DropdownMenuItem
                    key={device.id}
                    className='flex gap-2 justify-start'
                    onClick={() => handleDeviceChange(device)}
                  >
                    {device.type.toLowerCase() === 'computer' && (
                      <Laptop2 size={22} />
                    )}
                    {device.type.toLowerCase() === 'smartphone' && (
                      <Smartphone size={22} />
                    )}
                    {device.type.toLowerCase() === 'speaker' && (
                      <Speaker size={22} />
                    )}
                    {device.name}
                  </DropdownMenuItem>
                ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

DevicesButton.displayName = 'DevicesButton'

export { DevicesButton }
