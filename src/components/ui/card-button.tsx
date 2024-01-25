// import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import dynamicIconImports from 'lucide-react/dynamicIconImports'

import React from 'react'

import { cn } from '@/lib/utils'

import { Card } from './card'
import { CoverImage } from './cover-image'
import { ItemTitle, ItemTitleSkeleton } from './item-title'
import { SpotifyPlayButton } from './spotify-play-button'

interface CardButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string | React.ReactNode
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
      name,
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
              name={name}
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
          `bg-tinted-base hover:bg-tinted-higlight-2 active:bg-tinted-press  border-none cursor-pointer`,
          className,
          dir === 'row'
            ? 'rounded-sm'
            : 'p-4 isolate relative w-full rounded-md'
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
            <CoverImage
              className={cn(
                `shadow-md`,
                dir === 'row' ? 'max-w-[20%]' : '',
                imageClassName
              )}
              loading={true}
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

export { CardButton, CardButtonSkeleton }
