import React from 'react'

import { Controls } from './controls'
import { Progress } from './progress'

interface PlayerControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

const PlayerControls = React.forwardRef<HTMLDivElement, PlayerControlsProps>(
  ({ ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        <Controls className='mb-2 flex w-full items-center justify-center gap-4' />
        <Progress className='flex w-full items-center justify-between gap-2' />
      </div>
    )
  }
)

PlayerControls.displayName = 'PlayerControls'

export { PlayerControls }
