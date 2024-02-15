import React, { useEffect } from 'react'

import { playbackStateAtom, repeatStateAtom } from '@/lib/atoms'
import spotify from '@/lib/spotify-sdk'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'

import { Repeat, Repeat1 } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface RepeatButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const RepeatButton = React.forwardRef<HTMLButtonElement, RepeatButtonProps>(
  ({ className, ...props }, ref) => {
    const { data: session } = useSession()
    const [repeatState, setRepeatState] = useAtom(repeatStateAtom)
    const [playbackState, setPlaybackState] = useAtom(playbackStateAtom)

    useEffect(() => {
      ;(async () => {
        if (playbackState && session) {
          setRepeatState(playbackState.repeat_state)
        }
      })()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setRepeat = (updatedState: 'off' | 'context' | 'track') => {
      spotify.player.setRepeatMode(updatedState).then(() => {
        spotify.player.getPlaybackState().then((state) => {
          setRepeatState(state.repeat_state)
          setPlaybackState(state)
        })
      })
    }

    const handleButtonClick = () => {
      const newState =
        repeatState === 'off'
          ? 'context'
          : repeatState === 'context'
            ? 'track'
            : 'off'
      setRepeat(newState)
    }

    return (
      <Button
        disabled={!session}
        onClick={handleButtonClick}
        ref={ref}
        size='icon'
        {...props}
        className={cn(
          `h-8 w-8 rounded-full p-0`,
          `bg-transparent text-foreground opacity-70 hover:bg-transparent hover:opacity-100 active:bg-transparent`,
          (repeatState === 'context' || repeatState === 'track') &&
            'text-spotify opacity-100',
          (repeatState === 'context' || repeatState === 'track') &&
            'after:absolute after:bottom-0 after:left-1/2 after:z-[-1] after:h-1 after:w-1 after:translate-x-[-50%] after:rounded-full after:bg-spotify after:opacity-100'
        )}
        scale={true}
      >
        {(repeatState === 'off' || repeatState == 'context') && (
          <Repeat size={16} />
        )}
        {repeatState === 'track' && <Repeat1 size={16} />}
      </Button>
    )
  }
)

RepeatButton.displayName = 'RepeatButton'

export { RepeatButton }
