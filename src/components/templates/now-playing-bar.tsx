'use client'

import React from 'react'

import { cn } from '@/lib/utils'

interface FooterProps {
  children: React.ReactNode
  className?: string
}

const NowPlayingBar = React.forwardRef<HTMLElement, FooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <footer
        className={cn(`now-playing-bar flex items-center h-[72px]`, className)}
        {...props}
        ref={ref}
      >
        {children}
      </footer>
    )
  }
)

NowPlayingBar.displayName = 'NowPlayingBar'

export { NowPlayingBar }
