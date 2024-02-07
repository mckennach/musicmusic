'use client'

// import '@/styles/header.css'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { useSession } from 'next-auth/react'

import {
  HeroDescription,
  HeroImageContainer,
  HeroTextContainer,
  HeroTitle
} from '@/components/molecules/hero'
import { CoverImage } from '@/components/ui/cover-image'

import { cn } from '@/lib/utils'
import Icon from '../ui/icon'

// Components

export interface HeroProps {
  title: string
  subtitle?: string
  subtitleIcon?: keyof typeof dynamicIconImports
  description?: string
  extraInfo?: React.ReactNode
  imageSrc?: string
  imageIcon?: keyof typeof dynamicIconImports
  imageSize: 'cover' | 'background'
  imageClassName?: string
  fallbackClassName?: string
}

export function Hero({
  title,
  subtitle,
  subtitleIcon,
  description,
  extraInfo,
  imageSrc,
  imageIcon,
  imageSize,
  imageClassName,
  fallbackClassName
}: HeroProps) {
  const { data: session, status } = useSession()

  return (
    <section
      role='banner'
      className='hero content-spacing flex relative overlfow-hidden'
    >
      {imageSize === 'cover' && (
        <>
          <div className='bg-[var(--random-color)] animate-fade-in absolute left-0 top-0 w-full h-full z-[-1]' />
          <div className='background-noise  animate-fade-in absolute left-0 top-0 w-full h-full z-[0] order-2' />
        </>
      )}

      {imageSize === 'cover' && (
        <HeroImageContainer>
          <CoverImage
            src={imageSrc}
            alt={`${title} cover`}
            icon={imageIcon}
            fallbackClassName={fallbackClassName}
            className={cn('w-full h-full rounded-sm shadow-md', imageClassName)}
          />
        </HeroImageContainer>
      )}

      <HeroTextContainer className=''>
        <span className='flex items-center gap-1 text-sm font-medium'>
          {subtitleIcon && (
            <Icon name={subtitleIcon} size={14} fill='#3d91f4' />
          )}
          {subtitle}
        </span>
        <HeroTitle title={title} className='hehe leading-[normal]' />
        <HeroDescription description={description} />
        <div className='flex items-center flex-wrap space-x-2 mt-2'>
          {extraInfo}
        </div>
      </HeroTextContainer>
    </section>
  )
}
