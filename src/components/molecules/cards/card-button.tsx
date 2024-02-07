'use client'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

import React from 'react'

import { cn } from '@/lib/utils'
import { Card } from '../../ui/card'
import { CoverImage } from '../../ui/cover-image'
import { ItemTitle } from '../../ui/item-title'
import { SpotifyPlayButton } from '../buttons/spotify-play-button'

import {
  CardButtonCloseTrigger,
  CardButtonContent,
  CardButtonImage,
  CardButton as CardButtonItem,
  CardButtonPlayButton,
  CardButtonText
} from '@/components/ui/card-button'

interface CardButtonRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string | React.ReactNode
  titleClassName?: string
  label?: string | React.ReactNode
  imageSrc?: string
  imageClassName?: string
  imageAlt?: string
  imageSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  imageIcon?: keyof typeof dynamicIconImports
  className?: string
  icon?: keyof typeof dynamicIconImports
  dir?: 'row' | 'column'
  contextUri?: string
}

const CardButtonRow = React.forwardRef<HTMLDivElement, CardButtonRowProps>(
  (
    {
      title,
      titleClassName,
      label,
      contextUri,
      imageSrc,
      imageClassName,
      imageAlt,
      imageSize,
      imageIcon,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <CardButtonItem ref={ref} className={cn('')} {...props} dir='row'>
        <CardButtonContent dir='row'>
          <CardButtonImage
            src={imageSrc}
            alt={imageAlt}
            dir='row'
            className='w-full h-full rounded-tr-none rounded-br-none'
            size={imageSize}
          />
          <CardButtonText
            className='w-full truncate bg-transparent'
            title={<span className='font-bold text-sm'>{title}</span>}
            titleClassName={titleClassName}
            label={label}
            icon={icon}
            dir='row'
          >
            <CardButtonPlayButton
              className='top-1/2 right-2 translate-y-[-50%] bottom-[unset]'
              fade={true}
              iconSize={14}
              contextUri={contextUri}
              iconClassName='w-8 h-8'
            />
          </CardButtonText>
        </CardButtonContent>
      </CardButtonItem>
    )
  }
)

CardButtonRow.displayName = 'CardButtonRow'

interface CardButtonVerticalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string | React.ReactNode
  titleClassName?: string
  label?: string | React.ReactNode
  imageSrc?: string
  imageClassName?: string
  imageAlt?: string
  imageSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  imageIcon?: keyof typeof dynamicIconImports
  className?: string
  icon?: keyof typeof dynamicIconImports
  dir?: 'row' | 'column'
  contextUri?: string
  showPlayButton?: boolean
  showCloseButton?: boolean
  onClose?: () => void
  onPlay?: () => void
}

const CardButtonVertical = React.forwardRef<
  HTMLDivElement,
  CardButtonVerticalProps
>(
  (
    {
      title,
      titleClassName,
      label,
      imageSrc,
      imageClassName,
      imageAlt,
      imageSize,
      imageIcon,
      contextUri,
      icon,
      showPlayButton = true,
      showCloseButton = false,
      onClose,
      onPlay,
      ...props
    },
    ref
  ) => {
    return (
      <CardButtonItem
        ref={ref}
        className={cn('p-2.5 pb-6 isolate relative w-full rounded-md group')}
        {...props}
        dir='column'
      >
        {showCloseButton && (
          <CardButtonCloseTrigger
            onClick={onClose}
            className='bg-[rgba(0,0,0,.3)] hover:scale-110 transition-all duration-100 ease-linear'
          />
        )}
        <CardButtonContent dir='column'>
          <CardButtonImage
            src={imageSrc}
            alt={imageAlt}
            dir='column'
            className={cn('w-full h-full', imageClassName)}
            size={imageSize}
          >
            {showPlayButton && (
              <CardButtonPlayButton
                onClick={onPlay}
                // className="'absolute  opacity-0 group-hover:opacity-100 bottom-1 right-1',"
                // className='bottom-1 right-1 -translate-y-2 group-hover:-translate-y-1 transition-all duration-300 ease-in-out'
                fade={true}
                fadeDir='up'
                contextUri={contextUri}
              />
            )}
          </CardButtonImage>
          <CardButtonText
            className='w-full truncate bg-transparent min-h-12 justify-start'
            title={<span className='font-bold text-sm'>{title}</span>}
            titleClassName={titleClassName}
            label={label}
            icon={icon}
            dir='column'
          />
        </CardButtonContent>
      </CardButtonItem>
    )
  }
)

CardButtonVertical.displayName = 'CardButtonVertical'

interface CardButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string | React.ReactNode
  titleClassName?: string
  label?: string | React.ReactNode
  imageSrc?: string
  imageClassName?: string
  imageAlt?: string
  imageSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  imageIcon?: keyof typeof dynamicIconImports
  dir?: 'row' | 'column'
  className?: string
  icon?: keyof typeof dynamicIconImports
}

const CardButton = React.forwardRef<HTMLDivElement, CardButtonProps>(
  (
    {
      title,
      titleClassName,
      label,
      imageSrc,
      imageClassName,
      imageAlt,
      imageSize,
      imageIcon = 'music',
      dir = 'row',
      className,
      icon,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        {...props}
        className={cn(
          `bg-tinted-base hover:bg-tinted-higlight-2 active:bg-tinted-press border-none cursor-pointer relative`,
          className,
          dir === 'row'
            ? 'rounded-sm group'
            : 'p-2.5 pb-6 isolate relative w-full rounded-md group'
        )}
      >
        <div className='h-full w-full'>
          <div
            className={cn(
              'flex gap-3  ',
              dir === 'row'
                ? 'flex-row items-center basis-1/3 p-0'
                : 'flex-col justify-center'
            )}
          >
            <div
              className={cn(
                'relative overflow-hidden card-item-image',
                dir === 'row' ? '' : ''
              )}
            >
              <CoverImage
                className={cn(`shadow-md`, imageClassName)}
                src={imageSrc}
                alt={`${name} cover image`}
                icon={imageIcon}
                size={imageSize ? imageSize : dir === 'row' ? 'md' : 'xl'}
              />
              {dir === 'column' && (
                <div
                  className={cn(
                    'absolute bottom-1 right-1 transform -translate-x-1 -translate-y-[-20px] opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 ease-in-out'
                  )}
                >
                  <div>
                    <SpotifyPlayButton
                      className='shadow-md w-12 h-12'
                      iconSize={20}
                    />
                  </div>
                </div>
              )}
            </div>

            <ItemTitle
              className='w-full truncate bg-transparent'
              title={title}
              titleClassName={titleClassName}
              label={label}
              icon={icon}
            />
            {dir === 'row' && (
              <div
                className={cn(
                  'absolute top-1/2 right-2 transform -translate-x-0 -translate-y-1/2 opacity-0 group-hover:opacity-100  transition-all duration-300 ease-in-out'
                )}
              >
                <div>
                  <SpotifyPlayButton
                    className='shadow-md w-10 h-10'
                    iconSize={18}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    )
  }
)

CardButton.displayName = 'CardButton'

export { CardButton, CardButtonRow, CardButtonVertical }
