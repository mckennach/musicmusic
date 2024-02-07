'use client'

// import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import dynamicIconImports from 'lucide-react/dynamicIconImports'

import React from 'react'

import { Card } from '@/components/ui/card'
import { CoverImage } from '@/components/ui/cover-image'
import { ItemTitle, ItemTitleSkeleton } from '@/components/ui/item-title'
import { activeContextUriAtom, isPlayingAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { X } from 'lucide-react'
import { SpotifyPlayButton } from '../molecules/buttons/spotify-play-button'
import { Button } from './button'
interface CardButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  dir?: 'row' | 'column'
  className?: string
}

const CardButton = React.forwardRef<HTMLDivElement, CardButtonProps>(
  ({ children, dir = 'column', className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        {...props}
        className={cn(
          `card-section__item bg-tinted-base hover:bg-tinted-higlight-2 active:bg-tinted-press border-none cursor-pointer relative overflow-hidden`,
          className,
          dir === 'row'
            ? 'rounded-sm group'
            : 'p-2.5 pb-6 isolate relative w-full rounded-md group bg-[#181818] hover:bg-[#282828] focus-within:bg-[#282828]'
        )}
      >
        {children}
      </Card>
    )
  }
)

CardButton.displayName = 'CardButton'

interface CardButtonContentProps extends React.HTMLAttributes<HTMLDivElement> {
  dir?: 'row' | 'column'
}

const CardButtonContent = React.forwardRef<
  HTMLDivElement,
  CardButtonContentProps
>(({ children, dir = 'column', className, ...props }, ref) => {
  return (
    <div className={cn('h-full w-full', className)} ref={ref}>
      <div
        className={cn(
          'flex gap-3  ',
          dir === 'row'
            ? 'flex-row items-center basis-1/3 p-0'
            : 'flex-col justify-center'
        )}
      >
        {children}
      </div>
    </div>
  )
})

CardButtonContent.displayName = 'CardButtonContent'

interface CardButtonTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string | React.ReactNode
  titleClassName?: string
  label?: string | React.ReactNode
  icon?: keyof typeof dynamicIconImports
  dir?: 'row' | 'column'
}

const CardButtonText = React.forwardRef<HTMLDivElement, CardButtonTextProps>(
  (
    {
      title,
      titleClassName,
      label,
      icon,
      children,
      dir = 'column',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <ItemTitle
          className={cn('w-full truncate bg-transparent', className)}
          title={title}
          titleClassName={titleClassName}
          label={label}
          icon={icon}
          {...props}
          ref={ref}
        />
        {children}
      </>
    )
  }
)

CardButtonText.displayName = 'CardButtonText'

interface CardButtonCloseTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {}

const CardButtonCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  CardButtonCloseTriggerProps
>(({ className, ...props }, ref) => {
  return (
    <Button
      {...props}
      size='sm'
      variant='ghost'
      className={cn(
        'rounded-full absolute top-2 right-2 w-7 h-7 p-0',
        className
      )}
    >
      <X size={20} />
    </Button>
  )
})

CardButtonCloseTrigger.displayName = 'CardButtonCloseTrigger'

interface CardButtonPlayButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  fade: boolean
  fadeDir?: 'default' | 'up' | 'down' | 'left' | 'right'
  iconSize?: number
  iconClassName?: string
  contextUri?: string
}

const CardButtonPlayButton = React.forwardRef<
  HTMLDivElement,
  CardButtonPlayButtonProps
>(
  (
    {
      fade,
      fadeDir,
      className,
      iconSize = 20,
      iconClassName,
      contextUri,
      ...props
    },
    ref
  ) => {
    const [activeContextUri] = useAtom(activeContextUriAtom)
    const [isPlaying] = useAtom(isPlayingAtom)
    const isActive = activeContextUri === contextUri && isPlaying

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          'absolute -translate-x-1 -translate-y-0 opacity-100 group-hover:opacity-100 bottom-1 right-1',
          fade &&
            !isActive &&
            'opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out',
          fade &&
            !isActive &&
            fadeDir === 'up' &&
            'transform -translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0 transition-all duration-300 ease-in-out',
          fade &&
            !isActive &&
            fadeDir === 'down' &&
            'transform -translate-x-1 -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-0 transition-all duration-300 ease-in-out',
          fade &&
            !isActive &&
            fadeDir === 'left' &&
            'transform -translate-x-[20px] -translate-y-1 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-300 ease-in-out',
          fade &&
            !isActive &&
            fadeDir === 'right' &&
            'transform translate-x-[20px] -translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ease-in-out',
          className
        )}
      >
        <div>
          <SpotifyPlayButton
            className={cn('shadow-lg w-12 h-12', iconClassName)}
            iconSize={iconSize}
            contextUri={contextUri}
          />
        </div>
      </div>
    )
  }
)

CardButtonPlayButton.displayName = 'CardButtonPlayButton'

interface CardButtonImageProps extends React.HTMLAttributes<HTMLDivElement> {
  dir?: 'row' | 'column'
  src?: string
  alt?: string
  icon?: keyof typeof dynamicIconImports
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const CardButtonImage = React.forwardRef<HTMLDivElement, CardButtonImageProps>(
  (
    { dir = 'column', src, alt, icon, size, className, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden card-item-image',
          dir === 'row' ? '' : ''
        )}
      >
        <CoverImage
          className={cn(`shadow-md`, className)}
          src={src}
          alt={alt}
          icon={icon}
          size={size ? size : dir === 'row' ? 'md' : 'xl'}
        />
        {children}
      </div>
    )
  }
)

CardButtonImage.displayName = 'CardButtonImage'

interface CardButtonSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
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

const CardButtonSkeleton = React.forwardRef<
  HTMLDivElement,
  CardButtonSkeletonProps
>(
  (
    {
      imageSize,
      imageClassName,
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
          `card-section__item bg-tinted-base hover:bg-tinted-higlight-2 active:bg-tinted-press  border-none cursor-none relative overflow-hidden`,
          className,
          dir === 'row'
            ? 'rounded-sm group'
            : 'p-2.5 pb-6 isolate relative w-full rounded-md'
        )}
      >
        <div className='h-full w-full'>
          <div
            className={cn(
              'flex gap-3 ',
              dir === 'row'
                ? 'flex-row items-center basis-1/3 p-0'
                : 'flex-col justify-center'
            )}
          >
            <CoverImage
              className={cn(`shadow-md w-full h-full`, imageClassName)}
              loading={true}
              dir='column'
              icon={imageIcon}
              size={imageSize ? imageSize : dir === 'row' ? 'md' : 'xl'}
            />

            <ItemTitleSkeleton
              className='w-full truncate bg-transparent'
              dir={dir}
            />
          </div>
        </div>
      </Card>
    )
  }
)

CardButtonSkeleton.displayName = 'CardButtonSkeleton'

export {
  CardButton,
  CardButtonCloseTrigger,
  CardButtonContent,
  CardButtonImage,
  CardButtonPlayButton,
  CardButtonSkeleton,
  CardButtonText
}
