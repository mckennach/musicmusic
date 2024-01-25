'use client'

import { useSpotify } from '@/hooks'
import { Track } from '@spotify/web-api-ts-sdk'
import { useOnClickOutside } from 'usehooks-ts'

import React, { useRef, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useAtom } from 'jotai'

import {
  activeDeviceAtom,
  activePlaylistAtom,
  playbackStateAtom
} from '@/lib/atoms'
import spotify from '@/lib/spotify-sdk'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { CoverImage } from '@/components/ui/cover-image'
import { ItemTitle } from '@/components/ui/item-title'
import { TrackListColumn, TrackListRow } from '@/components/ui/track-list'

import { toast } from 'sonner'

interface TrackItemProps extends React.HTMLAttributes<HTMLDivElement> {
  track: Track
  index: number
  contextUri: string
  playlistId?: string
  id: string
}

const RecommendationTrackItem = ({
  track,
  index,
  contextUri,
  playlistId,
  id,
  ...props
}: TrackItemProps) => {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const { startResumePlayback, getPlaybackState } = useSpotify()
  const [isSelected, setIsSelected] = useState(false)
  const [playbackState, setPlaybackState] = useAtom(playbackStateAtom)

  const [activePlaylist, setActivePlaylist] = useAtom(activePlaylistAtom)
  const [activeDevice] = useAtom(activeDeviceAtom)

  const handleDoubleClick = async () => {
    if (activeDevice && activeDevice?.id) {
      await startResumePlayback(
        activeDevice?.id,
        contextUri,
        undefined,
        index,
        0
      )
      getPlaybackState().then((playbackState) => {
        setPlaybackState(playbackState)
        setActivePlaylist(contextUri)
      })
    }
  }

  const handleAddToPlaylist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    try {
      if (!playlistId) return
      spotify.playlists
        .addItemsToPlaylist(playlistId, [track?.uri])
        .then(() => {
          toast.success('Track added to playlist!')
          router.refresh()
        })
    } catch (error) {
      toast.error('Something went wrong, try again!')
    }
  }

  const handleClickOutside = () => {
    setIsSelected(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <TrackListRow
      ref={ref}
      onClick={() => setIsSelected(true)}
      onDoubleClick={handleDoubleClick}
      {...props}
      className={cn(
        `group cursor-pointer rounded-sm overflow-hidden`,
        isSelected
          ? 'bg-[hsla(0,0%,100%,.3)] hover:bg-[hsla(0,0%,100%,.3)]'
          : 'hover:bg-tinted-higlight'
      )}
      role='row'
      aria-rowindex={index + 1}
      // aria-colcount={4}
    >
      <TrackListColumn
        role='gridcell'
        className='grid-item relative'
        aria-colindex={1}
      >
        <span className='py-2 text-xs text-subdued-foreground flex items-center gap-3 truncate'>
          <CoverImage
            className='w-10 h-10 shrink-0'
            src={track?.album?.images[0]?.url || undefined}
            alt={track.name + ' cover'}
            icon='music'
          />
          <ItemTitle
            className='truncate !group-hover:text-white transition-colors duration-300'
            name={
              <Link
                className={cn(
                  `hover:underline font-medium`,
                  playbackState?.item?.id === track?.id ? 'text-spotify' : ''
                )}
                href={`/track/${track?.id}`}
              >
                {track.name}
              </Link>
            }
            label={
              <>
                {(track as Track).artists.map((artist, index) => (
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
        className='grid-item truncate text-subdued-foreground'
        aria-colindex={2}
        role='gridcell'
      >
        <Link
          href={`/album/${track?.album.id}`}
          className={cn(
            'hover:underline',
            'text-sm max-w-full truncate transition-colors duration-300 font-medium',
            isSelected ? 'text-white' : 'group-hover:text-white '
          )}
        >
          {track?.album.name}
        </Link>
      </TrackListColumn>
      <TrackListColumn
        role='gridcell'
        className='grid-item truncate text-subdued-foreground'
        aria-colindex={3}
      />

      <TrackListColumn
        role='gridcell'
        className='grid-item truncate text-subdued-foreground'
        aria-colindex={4}
      >
        <Button
          variant='outline'
          size='sm'
          className='rounded-full text-white border-white text-xs'
          onClick={(e) => handleAddToPlaylist(e)}
        >
          Add
        </Button>
      </TrackListColumn>
    </TrackListRow>
  )
}

export { RecommendationTrackItem }
