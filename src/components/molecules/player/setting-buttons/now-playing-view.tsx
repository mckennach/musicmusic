import React from 'react'

import { useAtom } from 'jotai'

// import Icon from '@/components/ui/icon'
import { nowPlayingViewAtom, sideBarRightActiveAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'

import { PlaySquare } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface NowPlayingButtonProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const NowPlayingButton = React.forwardRef<
  HTMLButtonElement,
  NowPlayingButtonProps
>(({ className, ...props }, ref) => {
  const [nowPlayingView, setNowPlayingView] = useAtom(nowPlayingViewAtom)
  const [sideBarActive, setSideBarActive] = useAtom(sideBarRightActiveAtom)

  const handleButtonClick = () => {
    if ((nowPlayingView && sideBarActive) || (!nowPlayingView && sideBarActive))
      setSideBarActive(false)
    if (!nowPlayingView && !sideBarActive) setSideBarActive(true)
    // if(!nowPlayingView && sideBarActive) setSideBarActive(false);
    setNowPlayingView(!nowPlayingView)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleButtonClick}
          ref={ref}
          size='icon'
          {...props}
          className={cn(
            `h-8 w-8 rounded-full p-2`,
            `bg-transparent text-foreground opacity-70 hover:bg-transparent hover:opacity-100 active:bg-transparent`,
            nowPlayingView && 'text-spotify opacity-100 hover:scale-100',
            nowPlayingView &&
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
