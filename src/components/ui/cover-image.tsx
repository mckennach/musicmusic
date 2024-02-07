import { cva } from 'class-variance-authority'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

import { forwardRef, useState } from 'react'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import { cn, imageLoader } from '@/lib/utils'

import { AspectRatio } from './aspect-ratio'
import Icon from './icon'
import { Skeleton } from './skeleton'

export interface CoverImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | StaticImport
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  scale?: boolean
  loading?: boolean
  className?: string
  fallbackClassName?: string
  icon?: keyof typeof dynamicIconImports
  iconClassName?: string
  iconSize?: number
}

const coverImageVariants = cva('h-7 w-7 rounded-sm', {
  variants: {
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10'
    }
  },
  defaultVariants: {}
})

const CoverImage = forwardRef<HTMLDivElement, CoverImageProps>(
  (
    {
      src,
      alt,
      size,
      scale = false,
      loading = false,
      className,
      fallbackClassName,
      icon = 'music',
      iconClassName,
      iconSize = 16
    },
    ref
  ) => {
    const [loaded, setIsLoaded] = useState(false)

    return (
      <div
        ref={ref}
        className={cn(
          `h-12 w-12 rounded-sm overflow-hidden`,
          size && size === 'sm' && `h-12 w-12`,
          size && size === 'md' && `h-14 w-14`,
          size && size === 'lg' && `h-18 w-18`,
          size && size === 'xl' && `h-24 w-24`,
          size && size === '2xl' && `h-32 w-32`,
          size && size === '3xl' && `h-40 w-40`,
          size && size === '4xl' && `h-48 w-48`,
          scale &&
            `scale-100 transform transition-all duration-75 hover:scale-105`,
          className
        )}
      >
        <AspectRatio ratio={1}>
          {loading ? (
            <Skeleton className='flex items-center justify-center w-full h-full' />
          ) : (
            <>
              {src ? (
                <>
                  <Image
                    src={src}
                    alt='Cover Image'
                    loader={imageLoader}
                    fill={true}
                    sizes='100%'
                    style={{ objectFit: 'cover', opacity: !loaded ? 0 : 1 }}
                    priority={true}
                    onLoad={() => setIsLoaded(true)}
                  />
                  {!loaded && (
                    <Skeleton className='flex items-center justify-center w-full h-full' />
                  )}
                </>
              ) : (
                <div
                  className={cn(
                    'flex items-center justify-center w-full h-full bg-[#282828]',
                    fallbackClassName
                  )}
                >
                  <Icon
                    name={icon}
                    className={cn('w-1/2 h-1/2', iconClassName)}
                  />
                </div>
              )}
            </>
          )}
        </AspectRatio>
      </div>
    )
  }
)

CoverImage.displayName = 'CoverImage'

export { CoverImage }
