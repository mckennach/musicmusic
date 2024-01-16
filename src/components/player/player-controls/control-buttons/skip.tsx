import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { useSpotify } from '@/hooks'
import { asyncPlaybackAtom, playbackStateAtom, sessionAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { useAtomCallback } from 'jotai/utils'
import React, { useCallback } from 'react'
interface SkipButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  action: 'previous' | 'next'
  icon: 'skip-back' | 'skip-forward'
}

const SkipButton = React.forwardRef<HTMLButtonElement, SkipButtonProps>(
  ({ action, icon, className, ...props }, ref) => {
    const spotify = useSpotify();
    const [session] = useAtom(sessionAtom);

    const [playbackState] = useAtom(playbackStateAtom)
    const [, sync] = useAtom(asyncPlaybackAtom)

    const handleButtonClick = useAtomCallback(
      useCallback(async (get) => {
        if (action === 'previous') {
          await spotify.skipToPrevious()
        } else if (action === 'next') {
          await spotify.skipToNext()
        }

        sync()
      }, [action, spotify, sync])
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
