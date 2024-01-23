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

const TrackListGrid = React.forwardRef<
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
      {children}
    </div>
  )
})

TrackListGrid.displayName = 'TrackListGrid'

const TrackListBody = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      className={cn(`track-list__body rounded-sm`, className)}
      ref={ref}
      role='presentation'
      {...props}
    >
      {children}
    </div>
  )
})

TrackListBody.displayName = 'TrackListBody'

const TrackListGridItem = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      className={cn(`track-list__grid-item `, className)}
      role='gridcell'
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

TrackListGridItem.displayName = 'TrackListGridItem'

export {
  TrackList,
  TrackListBody,
  TrackListGrid,
  TrackListGridItem,
  TrackListHeading
}
