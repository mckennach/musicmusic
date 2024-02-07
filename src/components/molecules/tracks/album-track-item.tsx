'use client'

import { Track } from '@spotify/web-api-ts-sdk'

import React from 'react'

import Link from 'next/link'

import { useAtom } from 'jotai'

import { TrackItemProps } from '@/types/database.ds'

import { playbackStateAtom } from '@/lib/atoms'
import { cn, millisToMinutesAndSeconds } from '@/lib/utils'

import { CheckCircle2, MoreHorizontal, Play, PlusCircle } from 'lucide-react'

import { ItemTitle } from '@/components/ui/item-title'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { TrackListColumn, TrackListRow } from '@/components/ui/track-list'

const AlbumTrackItem = React.forwardRef<HTMLDivElement, TrackItemProps>(
  (
    {
      id,
      track,
      index,
      type,
      contextUri,
      colCount,
      isSelected,
      isSaved,
      handleSaveItem,
      ...props
    },
    ref
  ) => {
    const [playbackState] = useAtom(playbackStateAtom)
    return (
      <TrackListRow ref={ref} {...props}>
        <TrackListColumn
          role='gridcell'
          className='grid-item relative'
          aria-colindex={1}
        >
          <Play
            color='white'
            fill='white'
            className={cn(
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300',
              isSelected ? 'opacity-100' : 'group-hover:opacity-100'
            )}
            size={18}
          />
          <span
            className={cn(
              'text-sm opacity-100  transition-opacity duration-300',
              isSelected ? 'opacity-0' : 'group-hover:opacity-0'
            )}
          >
            {index + 1}
          </span>
        </TrackListColumn>
        <TrackListColumn
          role='gridcell'
          className='grid-item'
          aria-colindex={2}
        >
          <span className='py-2 text-xs text-subdued-foreground flex items-center gap-3 truncate'>
            <ItemTitle
              className='truncate !group-hover:text-white transition-colors duration-300'
              title={
                <Link
                  className={cn(
                    `hover:underline font-medium`,
                    playbackState?.item?.id === track.id ? 'text-spotify' : ''
                  )}
                  href={`/track/${track.id}`}
                >
                  {track.name}
                </Link>
              }
              label={
                <>
                  {track.artists.map((artist, index) => (
                    <Link
                      href={`/artist/${artist?.id}`}
                      key={artist.id}
                      className='hover:underline font-medium'
                    >
                      {artist.name}
                      {index < (track as Track).artists.length - 1 && ', '}
                    </Link>
                  ))}
                </>
              }
            />
          </span>
        </TrackListColumn>
        <TrackListColumn
          role='gridcell'
          className='grid-item truncate text-subdued-foreground'
          aria-colindex={3}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => handleSaveItem(e, isSaved)}
                className={cn(
                  'mr-5 text-subdued-foreground hover:text-white hover:scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300',
                  isSelected || isSaved ? 'opacity-100' : ''
                )}
              >
                {isSaved ? (
                  <CheckCircle2
                    size={16}
                    className='text-black fill-bright-accent'
                  />
                ) : (
                  <PlusCircle size={16} />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {isSaved ? 'Remove from your library' : 'Save to your library'}
            </TooltipContent>
          </Tooltip>

          <span className='text-sm max-w-full mr-3 truncate font-medium'>
            {millisToMinutesAndSeconds(track.duration_ms)}
          </span>
          <button
            className={cn(
              'text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300',
              isSelected ? 'opacity-100' : ''
            )}
          >
            <MoreHorizontal size={16} className='' />
          </button>
        </TrackListColumn>
      </TrackListRow>
    )
  }
)

AlbumTrackItem.displayName = 'AlbumTrackItem'

export { AlbumTrackItem }
