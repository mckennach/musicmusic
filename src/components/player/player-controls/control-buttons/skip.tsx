import { Button } from '@/components/ui/button'
import Icon from '@/components/ui/icon'
import { repeatStateAtom, shuffleStateAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import React from 'react'
interface SkipButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  action: 'previous' | 'next'
  icon: 'skip-back' | 'skip-forward'
}

const SkipButton = React.forwardRef<HTMLButtonElement, SkipButtonProps>(
  ({ action, icon, className, ...props }, ref) => {
    const [shuffleState, setShuffleState] = useAtom(shuffleStateAtom)
    const [repeatState, setRepeatState] = useAtom(repeatStateAtom)
    return (
      <Button
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
