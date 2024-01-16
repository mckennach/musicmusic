import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useSpotify } from '@/hooks'
import { playbackStateAtom, shuffleStateAtom, sessionAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { Shuffle } from 'lucide-react'
import React, { useEffect } from 'react'
interface ShuffleButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const ShuffleButton = React.forwardRef<HTMLButtonElement, ShuffleButtonProps>(
  ({ className, ...props }, ref) => {
    const [session] = useAtom(sessionAtom);
    const spotify = useSpotify()
    const [playbackState] = useAtom(playbackStateAtom)
    const [shuffleState, setShuffleState] = useAtom(shuffleStateAtom)
    useEffect(() => {
      ;(async () => {
        if (playbackState && session) {
          setShuffleState(playbackState.shuffle_state)
        }
      })()
    }, [playbackState, session, setShuffleState])

    const handleButtonClick = () => {
      spotify.setShuffle(!shuffleState).then(() => {
        setShuffleState(!shuffleState)
      })
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={!session}
            onClick={handleButtonClick}
            ref={ref}
            {...props}
            size='icon'
            className={cn(
              `relative h-8 w-8 rounded-full p-0`,
              `bg-transparent text-foreground opacity-70 hover:bg-transparent hover:opacity-100 active:bg-transparent`,
              shuffleState && 'text-spotify opacity-100',
              shuffleState &&
                'after:absolute after:bottom-0 after:left-1/2 after:z-[-1] after:h-1 after:w-1 after:translate-x-[-50%] after:rounded-full after:bg-spotify after:opacity-100'
            )}
            scale={true}
          >
            <Shuffle size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side='top' align='center'>
          {shuffleState ? 'Disable shuffle' : 'Enable shuffle'}
        </TooltipContent>
      </Tooltip>
    )
  }
)

ShuffleButton.displayName = 'ShuffleButton'

export { ShuffleButton }
