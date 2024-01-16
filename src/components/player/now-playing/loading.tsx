import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

interface NowPlayingProps extends React.HTMLAttributes<HTMLDivElement> {}

const NowPlayingLoading = React.forwardRef<HTMLDivElement, NowPlayingProps>(
  ({ ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        <div className='flex w-full items-center justify-start'>
          <div className='flex max-w-full items-center gap-x-3 gap-y-2 truncate'>
            <Skeleton className='h-14 w-14 rounded-sm' />
            <div className='h-full max-w-full space-y-1 truncate text-left'>
              <Skeleton className='h-4 w-36 max-w-full' />
              <Skeleton className='h-2 w-32 max-w-full' />
            </div>
          </div>
        </div>
      </div>
    )
  }
)

NowPlayingLoading.displayName = 'NowPlayingLoading'

export { NowPlayingLoading }
