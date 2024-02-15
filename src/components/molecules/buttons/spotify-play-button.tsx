'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import {
  activeContextUriAtom,
  activeDeviceAtom,
  isPlayingAtom,
  playbackStateAtom
} from '@/lib/atoms'
import spotifySdk from '@/lib/spotify-sdk'
import { cn } from '@/lib/utils'
import { useAtom, useAtomValue } from 'jotai'
import { Pause, Play } from 'lucide-react'
import React from 'react'

interface SpotifyPlayButtonProps extends ButtonProps {
  className?: string
  iconSize?: number
  contextUri?: string
  fade?: boolean
  fadeDir?: 'default' | 'up' | 'down' | 'left' | 'right'
}

const SpotifyPlayButton = React.forwardRef<
  HTMLButtonElement,
  SpotifyPlayButtonProps
>(({ className, fade, fadeDir, iconSize = 19, contextUri, ...props }, ref) => {
  const activeDevice = useAtomValue(activeDeviceAtom)
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom)
  const [playbackState, setPlaybackState] = useAtom(playbackStateAtom)
  const [activeContextUri, setActiveContextUri] = useAtom(activeContextUriAtom)
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (
      activeDevice &&
      activeDevice.id &&
      contextUri &&
      activeContextUri !== contextUri
    ) {
      spotifySdk.player
        .startResumePlayback(activeDevice?.id, contextUri)
        .then(() => {
          // setActiveContextUri(contextUri)
          spotifySdk.player.getPlaybackState().then((state) => {
            setPlaybackState(state)
            setIsPlaying(state.is_playing)
          })
        })
    } else if (
      activeDevice &&
      activeDevice.id &&
      isPlaying &&
      activeContextUri === contextUri
    ) {
      spotifySdk.player.pausePlayback(activeDevice?.id).then(() => {
        // setActiveContextUri('')
        spotifySdk.player.getPlaybackState().then((state) => {
          setPlaybackState(state)
          setIsPlaying(state.is_playing)
        })
      })
    }
  }
  return (
    <Button
      onClick={(e) => handleButtonClick(e)}
      className={cn('rounded-full bg-spotify w-14 h-14', className)}
      size='icon'
      scale={true}
      {...props}
      ref={ref}
    >
      {isPlaying && activeContextUri === contextUri ? (
        <Pause
          size={iconSize}
          color='black'
          fill='black'
          // className="translate-x-0.5"
        />
      ) : (
        <Play
          size={iconSize}
          color='black'
          fill='black'
          className='translate-x-0.5'
        />
      )}
    </Button>
  )
})

SpotifyPlayButton.displayName = 'SpotifyPlayButton'

export { SpotifyPlayButton }
