import { Button } from '@/components/ui/button'
import { repeatStateAtom, shuffleStateAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
import { Play } from 'lucide-react'
import React from 'react'
interface PlayPauseProps extends React.HTMLAttributes<HTMLDivElement> {}

const PlayPauseButton = React.forwardRef<HTMLButtonElement, PlayPauseProps>(
  ({ className, ...props }, ref) => {
    const [shuffleState, setShuffleState] = useAtom(shuffleStateAtom)
    const [repeatState, setRepeatState] = useAtom(repeatStateAtom)
    return (
      <Button
        size='icon'
        className='h-8 w-8 rounded-full'
        scale={true}
        ref={ref}
      >
        <Play size={16} fill='black' />
      </Button>
    )
  }
)

PlayPauseButton.displayName = 'PlayPauseButton'

export { PlayPauseButton }
