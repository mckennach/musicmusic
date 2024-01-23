import React from 'react'

import { cn } from '@/lib/utils'

import {
  PlayPauseButton,
  RepeatButton,
  ShuffleButton,
  SkipButton
} from './control-buttons'

interface ControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

const Controls = React.forwardRef<HTMLDivElement, ControlsProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        <div className='flex items-center justify-end gap-2'>
          <ShuffleButton />
          <SkipButton action='previous' icon='skip-back' />
        </div>
        <PlayPauseButton />
        <div className='flex items-center justify-start gap-2'>
          <SkipButton action='next' icon='skip-forward' />
          <RepeatButton />
        </div>
      </div>
    )
  }
)

Controls.displayName = 'Controls'

export { Controls }
