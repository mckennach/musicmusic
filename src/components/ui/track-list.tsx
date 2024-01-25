import React, { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

// import '@/styles/tracks/track-list.css'

const TrackList = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      className={cn(`track-list rounded-sm outline-0`, className)}
      role='grid'
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

TrackList.displayName = 'TrackList'

const TrackListHeading = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      className={cn(`track-list-heading animate-bar-opacity`, className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

TrackListHeading.displayName = 'TrackListHeading'

const TrackListRow = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      className={cn(`track-list__grid `, className)}
      ref={ref}
      role='row'
      {...props}
    >
      <div className='track-list__grid-container'>{children}</div>
    </div>
  )
})

TrackListRow.displayName = 'TrackListRow'

interface TrackListBodyProps extends HTMLAttributes<HTMLDivElement> {
  height?: number
}

const TrackListBody = React.forwardRef<HTMLDivElement, TrackListBodyProps>(
  ({ children, className, height, ...props }, ref) => {
    return (
      <div
        className={cn(`track-list__body rounded-sm`, className)}
        ref={ref}
        style={{
          height: height ? `${height}px` : 'auto'
        }}
        role='presentation'
        {...props}
      >
        <div
          className={cn('track-list__body-container')}
          style={{
            height: height ? `${height}px` : 'auto'
          }}
        >
          {children}
        </div>
      </div>
    )
  }
)

TrackListBody.displayName = 'TrackListBody'

const TrackListColumn = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      className={cn(`track-list__grid-item `, className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

TrackListColumn.displayName = 'TrackListColumn'

export {
  TrackList,
  TrackListBody,
  TrackListColumn,
  TrackListHeading,
  TrackListRow
}
