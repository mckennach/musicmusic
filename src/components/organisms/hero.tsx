'use client'

import { Button } from '@components/ui/button'
import { Playlist, User } from '@spotify/web-api-ts-sdk'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { signIn, useSession } from 'next-auth/react'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import spotify from '@/lib/spotify-sdk'

import { Bell, Users } from 'lucide-react'

// import '@/styles/header.css'
import { HeaderUserDropdown } from '@/components/molecules/header/header-user-dropdown'
import {
  HeroDescription,
  HeroImageContainer,
  HeroTextContainer,
  HeroTitle
} from '@/components/molecules/hero'
import { CoverImage } from '@/components/ui/cover-image'
// Components
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { UserAvatar } from '@/components/ui/user-avatar'

import { HeaderNavigation } from '../molecules/header/header-navigation'

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
