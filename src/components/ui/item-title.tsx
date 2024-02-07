import dynamicIconImports from 'lucide-react/dynamicIconImports'

import React from 'react'

import { cn } from '@/lib/utils'

import Icon from './icon'
import { Skeleton } from './skeleton'

interface ItemTitleProps {
  title: string | React.ReactNode
  titleClassName?: string
  label?: string | React.ReactNode
  className?: string
  icon?: keyof typeof dynamicIconImports
}

const ItemTitle = React.forwardRef<HTMLDivElement, ItemTitleProps>(
  ({ title, titleClassName, label, className, icon, ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          `flex flex-col justify-center items-start`,
          'h-full max-w-full space-y-0.5 truncate text-left',
          className
        )}
      >
        <p
          className={cn(
            'truncate text-base max-w-full font-semibold leading-snug text-foreground',
            titleClassName
          )}
        >
          {title}
        </p>
        {label && (
          <div className='flex items-center max-w-full gap-1.5 truncate text-xs font-medium text-subdued'>
            {icon && (
              <Icon
                name={icon}
                size={10}
                className='rotate-45 text-spotify min-w-[10px]'
                fill='#1ed760'
              />
            )}
            <span className='truncate max-w-full'>{label}</span>
          </div>
        )}
      </div>
    )
  }
)

ItemTitle.displayName = 'ItemTitle'

interface ItemTitleSkeletonProps {
  className?: string
  dir?: 'row' | 'column'
}

const ItemTitleSkeleton = React.forwardRef<
  HTMLDivElement,
  ItemTitleSkeletonProps
>(({ className, dir = 'row', ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        `flex flex-col justify-center items-start`,
        'h-full max-w-full space-y-0.5 truncate text-left pr-4',
        'flex flex-col items-start h-full max-w-full space-y-0.5 text-left w-full truncate bg-transparent min-h-14 justify-start',
        className
      )}
    >
      <Skeleton
        className={cn(
          'truncate text-base w-full font-medium leading-snug text-foreground rounded-full',
          dir === 'row' ? 'h-6' : 'h-4'
        )}
      />

      {dir === 'column' && <Skeleton className='w-10 h-3' />}
    </div>
  )
})

ItemTitleSkeleton.displayName = 'ItemTitleSkeleton'

export { ItemTitle, ItemTitleSkeleton }
