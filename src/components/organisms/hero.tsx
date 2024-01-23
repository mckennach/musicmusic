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

// Components

export interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  extraInfo?: React.ReactNode
  imageSrc?: string
  imageIcon?: keyof typeof dynamicIconImports
  imageSize: 'cover' | 'background'
}

export function Hero({
  title,
  subtitle,
  description,
  extraInfo,
  imageSrc,
  imageIcon,
  imageSize
}: HeroProps) {
  const { data: session, status } = useSession()
  return (
    <section className='hero content-spacing flex relative overlfow-hidden'>
      <div className='bg-[var(--random-color)] absolute left-0 top-0 w-full h-full z-[-1]' />
      <div className='background-noise absolute left-0 top-0 w-full h-full z-[0] order-2' />
      <HeroImageContainer>
        <CoverImage
          src={imageSrc}
          alt={`${title} cover`}
          icon={imageIcon}
          className='w-full h-full rounded-sm shadow-md'
        />
      </HeroImageContainer>
      <HeroTextContainer className=''>
        <span className='flex items-center text-sm font-medium'>
          {subtitle}
        </span>
        <HeroTitle title={title} className='hehe leading-[normal]' />
        <HeroDescription description={description} />
        <div className='flex items-center flex-wrap space-x-2'>{extraInfo}</div>
      </HeroTextContainer>
    </section>
  )
}
