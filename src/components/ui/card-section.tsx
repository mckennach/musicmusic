'use client'

import React from 'react'

import { cn } from '@/lib/utils'

interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: React.ReactNode
  className?: string
  children?: React.ReactNode | string
  as?: 'div' | 'section' | 'article'
  dir?: 'row' | 'column'
}

const CardSection = React.forwardRef<HTMLDivElement, CardSectionProps>(
  ({ className, dir = 'column', as = 'section', children, ...props }, ref) => {
    const Tag = as
    return (
      <Tag
        className={cn(`card-section card-section__${dir}`, className)}
        ref={ref}
        {...props}
      >
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
      className={cn('flex items-center justify-between my-1', className)}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )
})

CardSectionHeading.displayName = 'CardSectionHeading'

interface CardSectionItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  gridCols?: number
  gap?: number
  dir?: 'row' | 'column'
}

const CardSectionItems = React.forwardRef<
  HTMLDivElement,
  CardSectionItemsProps
>(
  (
    { className, gridCols = 3, gap = 2, children, dir = 'column', ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          `card-section__items card-section__items-${dir}`,
          ``,
          className
        )}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    )
  }
)

CardSectionItems.displayName = 'CardSectionItems'

export { CardSection, CardSectionHeading, CardSectionItems }
