// import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import dynamicIconImports from 'lucide-react/dynamicIconImports'

import React from 'react'

import { cn } from '@/lib/utils'

import { Card } from './card'
import { CoverImage } from './cover-image'
import { ItemTitle, ItemTitleSkeleton } from './item-title'

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
              src={imageSrc}
              alt={`${name} cover image`}
              icon={imageIcon}
              size={imageSize ? imageSize : dir === 'row' ? 'md' : 'xl'}
            />
            <ItemTitle
              className='w-full truncate bg-transparent'
              name={name}
              label={label}
              icon={icon}
            />
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
