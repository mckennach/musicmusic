import { Button } from '@/components/ui/button'
import { useSpotify } from '@/hooks'
import { playbackStateAtom, repeatStateAtom, sessionAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { Repeat, Repeat1 } from 'lucide-react'
import React, { useEffect } from 'react'
interface RepeatButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const RepeatButton = React.forwardRef<HTMLButtonElement, RepeatButtonProps>(
  ({ className, ...props }, ref) => {
    const spotify = useSpotify();
    const [session] = useAtom(sessionAtom);
    const [repeatState, setRepeatState] = useAtom(repeatStateAtom)
    const [playbackState] = useAtom(playbackStateAtom)

    useEffect(() => {
      ;(async () => {
        if (playbackState && session) {
          setRepeatState(playbackState.repeat_state)
        }
      })()
    }, [playbackState, session, setRepeatState])

    const handleButtonClick = () => {
      if (repeatState === 'off') {
        spotify.setRepeat('context').then(() => {
          setRepeatState('context')
        })
      } else if (repeatState === 'context') {
        spotify.setRepeat('track').then(() => {
          setRepeatState('track')
        })
      } else {
        spotify.setRepeat('off').then(() => {
          setRepeatState('off')
        })
      }
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
