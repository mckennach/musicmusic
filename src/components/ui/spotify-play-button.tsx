import { cn } from '@/lib/utils'
import { Play } from 'lucide-react'
import React from 'react'
import { Button, ButtonProps } from '../ui/button'

interface SpotifyPlayButtonProps extends ButtonProps {
  className?: string
  iconSize?: number
}

const SpotifyPlayButton = React.forwardRef<
  HTMLButtonElement,
  SpotifyPlayButtonProps
>(({ className, iconSize = 19, ...props }, ref) => {
  return (
    <Button
      className={cn('rounded-full bg-spotify w-14 h-14', className)}
      size='icon'
      scale={true}
      {...props}
      ref={ref}
    >
      <Play
        size={iconSize}
        color='black'
        fill='black'
        className='translate-x-0.5'
      />
    </Button>
  )
})

SpotifyPlayButton.displayName = 'SpotifyPlayButton'

export { SpotifyPlayButton }
