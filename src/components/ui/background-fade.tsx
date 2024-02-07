'use client'

import { cn } from '@/lib/utils'
import React from 'react'
interface BackgroundFadeProps {
  className?: string
}

const BackgroundFade = React.forwardRef<HTMLDivElement, BackgroundFadeProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          `bg-[var(--random-color,transparent)]`,
          `background-fade animate-fade-in`,
          className
        )}
      />
    )
  }
)

BackgroundFade.displayName = 'BackgroundFade'

export { BackgroundFade }
