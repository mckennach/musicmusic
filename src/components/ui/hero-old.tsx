'use client'

import React from 'react'

import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const Hero = React.forwardRef<HTMLDivElement, any>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn(`hero`, className)} ref={ref} {...props}>
        {props.children}
      </div>
    )
  }
)

Hero.displayName = 'Hero'

interface HeroImageProps {
  src: string | undefined
  alt: string
  fallback: string
  className: string
}

const HeroImage = React.forwardRef<HTMLSpanElement, HeroImageProps>(
  ({ src, alt, fallback, className, ...props }, ref) => {
    return (
      <Avatar className={cn(className)} ref={ref} {...props}>
        <AvatarImage src={src} alt={alt} className='rounded-sm' />
        <AvatarFallback className='rounded-sm'>{fallback}</AvatarFallback>
      </Avatar>
    )
  }
)

HeroImage.displayName = 'HeroImage'

const HeroTextContainer = React.forwardRef<HTMLDivElement, any>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn(className)} ref={ref} {...props}>
        {props.children}
      </div>
    )
  }
)

HeroTextContainer.displayName = 'HeroTextContainer'

const HeroHeading = React.forwardRef<HTMLDivElement, any>(
  ({ src, alt, fallback, className, ...props }, ref) => {
    return (
      <div className={cn(className)} ref={ref} {...props}>
        {props.children}
      </div>
    )
  }
)

HeroHeading.displayName = 'HeroHeading'

const HeroDescription = React.forwardRef<HTMLDivElement, any>(
  ({ html, src, alt, fallback, className, ...props }, ref) => {
    return (
      <div
        className={cn(className)}
        ref={ref}
        {...props}
        dangerouslySetInnerHTML={{
          __html: html
        }}
      />
    )
  }
)

HeroDescription.displayName = 'HeroDescription'

export { Hero, HeroDescription, HeroHeading, HeroImage, HeroTextContainer }
