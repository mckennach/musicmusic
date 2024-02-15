import { useAtomCallback } from 'jotai/utils'

import React, { useCallback } from 'react'

import {
  activeDeviceAtom,
  asyncPlaybackAtom,
  playbackStateAtom
} from '@/lib/atoms'
import spotify from '@/lib/spotify-sdk'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'

import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'

interface SkipButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  action: 'previous' | 'next'
  icon: 'skip-back' | 'skip-forward'
}

const SkipButton = React.forwardRef<HTMLButtonElement, SkipButtonProps>(
  ({ action, icon, className, ...props }, ref) => {
    const [activeDevice] = useAtom(activeDeviceAtom)
    const { data: session } = useSession()

    const [playbackState] = useAtom(playbackStateAtom)
    const [, sync] = useAtom(asyncPlaybackAtom)

    const handleButtonClick = useAtomCallback(
      useCallback(
        async (get) => {
          if (activeDevice?.is_active && activeDevice?.id) {
            if (action === 'previous') {
              await spotify.player.skipToPrevious(activeDevice.id)
            } else if (action === 'next') {
              await spotify.player.skipToNext(activeDevice.id)
            }
          }
          sync()
        },
        [action, sync, activeDevice]
      )
    )

    return (
      <Button
        disabled={!session}
        onClick={handleButtonClick}
        size='icon'
        className={cn(
          `h-8 w-8 rounded-full p-0`,
          `bg-transparent text-foreground opacity-70 hover:bg-transparent hover:opacity-100 active:bg-transparent`
        )}
        scale={true}
      >
        <Icon name={icon} size={16} fill='white' />
      </Button>
    )
  }
)

SkipButton.displayName = 'SkipButton'

export { SkipButton }
