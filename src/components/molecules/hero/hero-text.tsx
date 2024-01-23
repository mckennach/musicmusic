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
    const [titleClasses, setTitleClasses] = useState<string[]>([
      'text-[2rem] @3xl:text-[4.5rem] @5-6xl:text-[6rem]'
    ])
    useEffect(() => {
      if (title && title.length < 13) {
        setTitleClasses(['text-[4.5rem] @4xl:text-[6rem]'])
      } else if (title && title.length < 25) {
        setTitleClasses(['text-[2rem] @3xl:text-[4.5rem] @5-6xl:text-[6rem]'])
      } else {
        setTitleClasses(['text-[2rem] @9xl:text-[3rem]'])
      }
    }, [title])

    return (
      <h1
        className={cn(
          'hero-title  font-bold break-words text-left w-full truncate',
          titleClasses,
          className
        )}
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

export { HeroTextContainer, HeroTitle, HeroDescription }
