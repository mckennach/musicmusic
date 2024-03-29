'use client'

import { useSpotify } from '@/hooks'
import { Track } from '@spotify/web-api-ts-sdk'
import { useOnClickOutside } from 'usehooks-ts'

import React, { useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { useAtom } from 'jotai'

import {
  activeDeviceAtom,
  activePlaylistAtom,
  asyncPlaybackAtom,
  playbackStateAtom
} from '@/lib/atoms'
import { cn, millisToMinutesAndSeconds } from '@/lib/utils'

import { CheckCircle2, MoreHorizontal, Play, PlusCircle } from 'lucide-react'

import { CoverImage } from '@/components/ui/cover-image'
import { ItemTitle } from '@/components/ui/item-title'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { TrackListColumn, TrackListRow } from '@/components/ui/track-list'

interface TrackItemProps extends React.HTMLAttributes<HTMLDivElement> {
  track: Track
  index: number
  contextUri: string
  artistId: string
}

const ArtistTrackItem = ({
  track,
  index,
  contextUri,
  artistId,
  ...props
}: TrackItemProps) => {
  // console.log('TRACK', track );
  const ref = useRef<HTMLDivElement>(null)
  const {
    checkIfItemIsSaved,
    saveItem,
    removeItem,
    startResumePlayback,
    getPlaybackState
  } = useSpotify()
  const [isSaved, setIsSaved] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [playbackState, setPlaybackState] = useAtom(playbackStateAtom)
  const [, syncPlayback] = useAtom(asyncPlaybackAtom)
  const [activePlaylist, setActivePlaylist] = useAtom(activePlaylistAtom)
  const [activeDevice] = useAtom(activeDeviceAtom)

  useEffect(() => {
    ;(async () => {
      if (track?.is_local) {
        setIsSaved(true)
        return
      }
      const isSaved = await checkIfItemIsSaved(track.id, 'tracks')
      setIsSaved(isSaved)
    })()
  }, [track, checkIfItemIsSaved])

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

  const handleClickOutside = () => {
    setIsSelected(false)
  }

  const handleSaveItem = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isSaved: boolean
  ) => {
    e.preventDefault()
    if (isSaved) {
      await removeItem((track as Track).id, 'tracks')
      setIsSaved(false)
    } else {
      await saveItem((track as Track).id, 'tracks')
      setIsSaved(true)
    }
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
    >
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
      <TrackListColumn role='gridcell' className='grid-item' aria-colindex={2}>
        <span className='py-2 text-xs text-subdued-foreground flex items-center gap-3 truncate'>
          <CoverImage
            className='w-10 h-10 shrink-0'
            src={
              track?.album?.images?.length > 0 ? track.album.images[0].url : ''
            }
            alt={track?.album?.name + ' Cover'}
            icon='music'
          />
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
        role='gridcell'
        className='grid-item truncate text-subdued-foreground'
        aria-colindex={3}
      >
        <Link
          href={`/album/${track.album.id}`}
          className={cn(
            'hover:underline',
            'text-sm max-w-full truncate transition-colors duration-300 font-medium',
            isSelected ? 'text-white' : 'group-hover:text-white '
          )}
        >
          {track.album.name}
        </Link>
      </TrackListColumn>
      <TrackListColumn
        role='gridcell'
        className='grid-item truncate text-subdued-foreground'
        aria-colindex={4}
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

export { ArtistTrackItem }
