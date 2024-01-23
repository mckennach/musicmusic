import { useDebounce } from '@/hooks'

import React, { useEffect } from 'react'

import { useAtom } from 'jotai'

// import Icon from '@/components/ui/icon'
import {
  activeDeviceAtom,
  asyncPlaybackAtom,
  playbackStateAtom,
  sessionAtom,
  volumeAtom,
  volumeBeforeMutedAtom,
  volumeMutedAtom
} from '@/lib/atoms'
import spotify from '@/lib/spotify-sdk'
import { cn } from '@/lib/utils'

import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

import { VolumeBar } from './volume-bar'

interface VolumeControlProps extends React.HTMLAttributes<HTMLDivElement> {}

const VolumeControl = React.forwardRef<HTMLDivElement, VolumeControlProps>(
  ({ className, ...props }, ref) => {
    const [activeDevice] = useAtom(activeDeviceAtom)
    const [, sync] = useAtom(asyncPlaybackAtom)
    const [session] = useAtom(sessionAtom)
    const [playbackState, setPlaybackState] = useAtom(playbackStateAtom)
    const [volumeBeforeMutedState, setVolumeBeforeMutedState] = useAtom(
      volumeBeforeMutedAtom
    )
    const [volumeMutedState, setVolumeMutedState] = useAtom(volumeMutedAtom)
    const [volumeState, setVolumeState] = useAtom(volumeAtom)
    const debouncedVolumeState = useDebounce(volumeState, 300)

    useEffect(() => {
      ;(async () => {
        if (activeDevice && typeof activeDevice.volume_percent === 'number') {
          setVolumeState(activeDevice.volume_percent)
        }
      })()
    }, [activeDevice, setVolumeState])

    useEffect(() => {
      if (volumeState === 0) {
        setVolumeMutedState(true)
      } else {
        setVolumeMutedState(false)
      }
    }, [
      volumeState,
      volumeMutedState,
      volumeBeforeMutedState,
      setVolumeMutedState
    ])

    useEffect(() => {
      ;(async () => {
        if (!activeDevice || !session) return
       await spotify.player.setPlaybackVolume(debouncedVolumeState);
        // await spotify.setVolume(debouncedVolumeState)
      })()
    }, [debouncedVolumeState, session, activeDevice])

    const handleMuteButtonClick = () => {
      if (volumeMutedState) {
        setVolumeState(volumeBeforeMutedState)
      } else {
        setVolumeBeforeMutedState(volumeState)
        setVolumeState(0)
      }
      setVolumeMutedState(!volumeMutedState)
    }

    const handleVolumeChange = (value: number) => {
      setVolumeState(value)
    }

    return (
      <div
        className={cn(
          `flex items-center justify-center relative grow-0 shrink basis-32`,
          className
        )}
        {...props}
        ref={ref}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleMuteButtonClick}
              size='icon'
              className={cn(
                `h-8 w-8 rounded-full p-2`,
                `bg-transparent text-foreground opacity-70 hover:bg-transparent hover:opacity-100 active:bg-transparent`
              )}
              scale={true}
            >
              {volumeMutedState || volumeState === 0 ? (
                <VolumeX size={16} />
              ) : volumeState < 50 ? (
                <Volume1 size={16} />
              ) : volumeState <= 100 ? (
                <Volume2 size={16} />
              ) : (
                <Volume size={16} />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side='top' align='center'>
            {volumeMutedState || volumeState === 0 ? 'Unmute' : 'Mute'}
          </TooltipContent>
        </Tooltip>
        <VolumeBar
          defaultValue={[volumeState]}
          value={[volumeState]}
          onValueChange={(value) => setVolumeState(value[0])}
          onValueCommit={(value) => setVolumeState(value[0])}
        />
      </div>
    )
  }
)

VolumeControl.displayName = 'VolumeControl'

export { VolumeControl }
