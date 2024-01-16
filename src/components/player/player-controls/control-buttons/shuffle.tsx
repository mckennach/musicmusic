import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { shuffleStateAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { Shuffle } from 'lucide-react'
import React from 'react'
interface ShuffleButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

const ShuffleButton = React.forwardRef<HTMLButtonElement, ShuffleButtonProps>(
  ({ className, ...props }, ref) => {
    const [shuffleState, setShuffleState] = useAtom(shuffleStateAtom)

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setShuffleState(!shuffleState)}
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
