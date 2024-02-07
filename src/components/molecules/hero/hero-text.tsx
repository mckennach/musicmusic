'use client'

import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

interface HeroTextContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const HeroTextContainer = React.forwardRef<
  HTMLDivElement,
  HeroTextContainerProps
>(({ className, ...props }, ref) => {
  return (
    <div className={`hero-text-container ${className}`} ref={ref} {...props}>
      {props.children}
    </div>
  )
})

HeroTextContainer.displayName = 'HeroTextContainer'

interface HeroTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string
}

const HeroTitle = React.forwardRef<HTMLHeadingElement, HeroTitleProps>(
  ({ title, className, ...props }, ref) => {
    const [titleClasses, setTitleClasses] = useState<string>(
      'text-[2rem] @[35rem]:text-[2rem] @[45rem]:text-[2.5rem] @[55rem]:text-[3.5rem] @[65rem]:text-[4.5rem] @[75rem]:text-[5rem]'
    )
    useEffect(() => {
      if (title) {
        if (title.length >= 35) {
          setTitleClasses(
            'text-[2rem] @[35rem]:text-[2rem] @[45rem]:text-[2.5rem] @[55rem]:text-[3.5rem] @[65rem]:text-[4.5rem] @[75rem]:text-[5rem]'
          )
        } else if (title.length >= 25) {
          setTitleClasses(
            'text-[2rem] @[35rem]:text-[2rem] @[45rem]:text-[2.5rem] @[55rem]:text-[3.5rem] @[65rem]:text-[4.5rem] @[75rem]:text-[5rem]'
          )
        } else if (title.length >= 17) {
          setTitleClasses(
            'text-[2rem] @[35rem]:text-[2.5rem] @[45rem]:text-[3rem] @[55rem]:text-[3.5rem] @[65rem]:text-[4.5rem] @[75rem]:text-[5rem]'
          )
        } else if (title.length >= 13) {
          setTitleClasses(
            'text-[2rem] @[35rem]:text-[2rem] @[45rem]:text-[2.5rem] @[55rem]:text-[3.5rem] @[65rem]:text-[4.5rem] @[75rem]:text-[5rem]'
          )
        } else {
          setTitleClasses(
            'text-[2rem] @[35rem]:text-[2rem] @[45rem]:text-[2.5rem] @[55rem]:text-[3.5rem] @[65rem]:text-[4.5rem] @[75rem]:text-[5rem]'
          )
        }
      }
    }, [title])

    return (
      <h1
        className={cn(
          'hero-title  font-bold break-words text-left w-full truncate tracking-tight',
          titleClasses,
          className
        )}
        style={
          {
            // fontSize: 'clamp(2rem, 10vw, 5rem)'
          }
        }
        ref={ref}
        {...props}
      >
        {title}
      </h1>
    )
  }
)

HeroTitle.displayName = 'HeroTitle'

interface HeroDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  description?: string
}

const HeroDescription = React.forwardRef<HTMLDivElement, HeroDescriptionProps>(
  ({ description, className, ...props }, ref) => {
    if (!description) return null
    return (
      <span
        className={cn(
          'hero-description text-sm font-medium mt-1 mb-2',
          className
        )}
        ref={ref}
        {...props}
        dangerouslySetInnerHTML={{
          __html: description
        }}
      />
    )
  }
)

HeroDescription.displayName = 'HeroDescription'

export { HeroDescription, HeroTextContainer, HeroTitle }
