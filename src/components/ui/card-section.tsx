'use client'

import React from 'react'

import { cn } from '@/lib/utils'

interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: React.ReactNode
  className?: string
  children?: React.ReactNode
  as?: 'div' | 'section' | 'article'
}

const CardSection = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, as = 'section', children, ...props }, ref) => {
    const Tag = as
    return (
      <Tag className={cn(`card-section`, className)} ref={ref} {...props}>
        {children}
      </Tag>
    )
  }
)

CardSection.displayName = 'CardSection'

interface CardSectionHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const CardSectionHeading = React.forwardRef<
  HTMLDivElement,
  CardSectionHeadingProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn('flex items-center justify-between mb-4', className)}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )
})

CardSectionHeading.displayName = 'CardSectionHeading'

interface CardSectionItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  gridCols: number
  gap: number
}

const CardSectionItems = React.forwardRef<
  HTMLDivElement,
  CardSectionItemsProps
>(({ className, gridCols = 3, gap = 2, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        `grid grid-cols-${gridCols.toString()} gap-${gap.toString()}`,
        className
      )}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )
})

CardSectionItems.displayName = 'CardSectionItems'

export { CardSection, CardSectionHeading, CardSectionItems }
