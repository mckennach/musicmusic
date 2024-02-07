import { cn } from '@/lib/utils'
import React from 'react'
interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SectionContainer = React.forwardRef<
  HTMLDivElement,
  SectionContainerProps
>(({ children, className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      {...props}
      className={cn(
        'content-section relative h-full bg-card isolate min-h-28',
        className
      )}
    >
      {children}
    </section>
  )
})

SectionContainer.displayName = 'SectionContainer'

export { SectionContainer }
