'use client'

import React from 'react'

import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
  children: React.ReactNode
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <header
        {...props}
        ref={ref}
        className={cn(`absolute left-0 top-0 z-20 w-full min-h-16`, className)}
      >
        <div className='flex items-center justify-between p-4'>
          <div className='flex items-center gap-2'>{children}</div>
        </div>
      </header>
    )
  }
)

Header.displayName = 'Header'

export { Header }
