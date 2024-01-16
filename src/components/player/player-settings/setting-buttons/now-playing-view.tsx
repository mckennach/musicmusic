import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useAtom } from 'jotai'
import React from 'react'
// import Icon from '@/components/ui/icon'
import { fullScreenAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { PlaySquare } from 'lucide-react'
interface NowPlayingButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const NowPlayingButton = React.forwardRef<
  HTMLButtonElement,
  NowPlayingButtonProps
>(({ className, ...props }, ref) => {
  const [fullScreenState, setFullScreenState] = useAtom(fullScreenAtom)
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={() => setFullScreenState(!fullScreenState)}
          ref={ref}
          size='icon'
          {...props}
          className={cn(
            `h-8 w-8 rounded-full p-2`,
            `bg-transparent text-foreground opacity-70 hover:bg-transparent hover:opacity-100 active:bg-transparent`,
            fullScreenState && 'text-spotify opacity-100 hover:scale-100',
            fullScreenState &&
              'after:absolute after:bottom-0 after:left-1/2 after:z-[-1] after:h-1 after:w-1 after:translate-x-[-50%] after:rounded-full after:bg-spotify after:opacity-100'
          )}
          scale={true}
        >
          <PlaySquare size={16} />
        </Button>
      </TooltipTrigger>
      <TooltipContent side='top' align='center'>
        Now playing view
      </TooltipContent>
    </Tooltip>
  )
})

NowPlayingButton.displayName = 'NowPlayingButton'

export { NowPlayingButton }
