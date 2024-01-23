'use client'

import { useSpotify } from '@/hooks'
import { Episode, PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk'
import { useOnClickOutside } from 'usehooks-ts'

import React, { useEffect, useRef, useState } from 'react'

import Link from 'next/link'

import { useAtom } from 'jotai'

import {
  activeDeviceAtom,
  activePlaylistAtom,
  activeTrackOrEpisodeAtom,
  asyncPlaybackAtom,
  playbackStateAtom
} from '@/lib/atoms'
import { cn, formatTime, millisToMinutesAndSeconds } from '@/lib/utils'

import { CheckCircle2, MoreHorizontal, Play, PlusCircle } from 'lucide-react'

import { CoverImage } from '@/components/ui/cover-image'
import { ItemTitle } from '@/components/ui/item-title'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { TrackListGrid, TrackListGridItem } from '@/components/ui/track-list'

interface TrackItemProps extends React.HTMLAttributes<HTMLDivElement> {
  track: PlaylistedTrack
  index: number
  contextUri: string
  playlistId: string
}

const PlaylistTrackItem = ({
  track,
  index,
  contextUri,
  playlistId,
  ...props
}: TrackItemProps) => {
  // console.log('TRACK', track );
  const ref = useRef<HTMLDivElement>(null)
  const {
    checkIfItemIsSaved,
    saveItem,
    unsaveItem,
    startResumePlayback,
    getPlaybackState
  } = useSpotify()
  const [isSaved, setIsSaved] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const [playbackState, setPlaybackState] = useAtom(playbackStateAtom)
  const [, syncPlayback] = useAtom(asyncPlaybackAtom)
  const [activePlaylist, setActivePlaylist] = useAtom(activePlaylistAtom)
  const [activeDevice] = useAtom(activeDeviceAtom)
  const albumOrPodcast =
    track.track.type === 'track'
      ? (track.track as Track).album
      : (track.track as Episode).show

  useEffect(() => {
    ;(async () => {
      if (track.track.type === 'track') {
        const isSaved = await checkIfItemIsSaved(
          (track.track as Track).id,
          'tracks'
        )
        setIsSaved(isSaved)
      } else {
        const isSaved = await checkIfItemIsSaved(
          (track.track as Episode).id,
          'episodes'
        )
        setIsSaved(isSaved)
      }
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
      if (track.track.type === 'track') {
        await unsaveItem((track.track as Track).id, 'tracks')
      } else {
        await unsaveItem((track.track as Episode).id, 'episodes')
      }
      setIsSaved(false)
    } else {
      if (track.track.type === 'track') {
        await saveItem((track.track as Track).id, 'tracks')
      } else {
        await saveItem((track.track as Episode).id, 'episodes')
      }
      setIsSaved(true)
    }
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <TrackListGrid
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
      <TrackListGridItem className='grid-item relative' data-colindex={1}>
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
      </TrackListGridItem>
      <TrackListGridItem className='grid-item' data-colindex={2}>
        <span className='py-2 text-xs text-subdued-foreground flex items-center gap-3 truncate'>
          <CoverImage
            className='w-10 h-10 shrink-0'
            src={
              track.track.type === 'track'
                ? (track.track as Track).album.images[0].url
                : (track.track as Episode).show.images[0].url
            }
            alt={track.track.name}
            icon='music'
          />
          <ItemTitle
            className='truncate !group-hover:text-white transition-colors duration-300'
            name={
              <Link
                className={cn(
                  `hover:underline`,
                  playbackState?.item?.id === track.track?.id
                    ? 'text-spotify'
                    : ''
                )}
                href={`/track/${track?.track?.id}`}
              >
                {track.track.name}
              </Link>
            }
            label={
              track.track.type === 'track' ? (
                <>
                  {(track.track as Track).artists.map((artist, index) => (
                    <Link
                      href={`/artist/${artist?.id}`}
                      key={artist.id}
                      className='hover:underline font-medium'
                    >
                      {artist.name}
                      {index < (track.track as Track).artists.length - 1 &&
                        ', '}
                    </Link>
                  ))}
                </>
              ) : (
                (track.track as Episode).show.publisher
              )
            }
          />
        </span>
      </TrackListGridItem>
      <TrackListGridItem
        className='grid-item truncate text-subdued-foreground'
        data-colindex={3}
      >
        <Link
          href={`/album/${albumOrPodcast.id}`}
          className={cn(
            'hover:underline',
            'text-sm max-w-full truncate transition-colors duration-300',
            isSelected ? 'text-white' : 'group-hover:text-white '
          )}
        >
          {albumOrPodcast.name}
        </Link>
      </TrackListGridItem>
      <TrackListGridItem
        className='grid-item truncate text-subdued-foreground'
        data-colindex={4}
      >
        <span className='text-sm max-w-full truncate'>
          {formatTime(track.added_at, false)}
        </span>
      </TrackListGridItem>
      <TrackListGridItem
        className='grid-item truncate text-subdued-foreground'
        data-colindex={5}
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

        <span className='text-sm max-w-full mr-3 truncate'>
          {millisToMinutesAndSeconds(track.track.duration_ms)}
        </span>
        <button
          className={cn(
            'text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300',
            isSelected ? 'opacity-100' : ''
          )}
        >
          <MoreHorizontal size={16} className='' />
        </button>
      </TrackListGridItem>
    </TrackListGrid>
  )
}

export { PlaylistTrackItem }
