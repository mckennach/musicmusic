'use client'

import { useSpotify } from '@/hooks'
import { Track } from '@spotify/web-api-ts-sdk'
import { useOnClickOutside } from 'usehooks-ts'

import React, { useRef, useState } from 'react'

import { useAtom } from 'jotai'
import { CheckCircle2, MoreHorizontal, PlusCircle } from 'lucide-react'

import { CoverImage } from '@/components/ui/cover-image'
import { ItemTitle } from '@/components/ui/item-title'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { TrackListColumn, TrackListRow } from '@/components/ui/track-list'
import { activeDeviceAtom, playbackStateAtom } from '@/lib/atoms'
import { cn, millisToMinutesAndSeconds } from '@/lib/utils'
import Link from 'next/link'
interface TrackItemProps extends React.HTMLAttributes<HTMLDivElement> {
  track: Track
  id: string
  index: number
  contextUri: string
}

const SearchTrackItem = ({
  track,
  id,
  index,
  contextUri,
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
  // const [, syncPlayback] = useAtom(asyncPlaybackAtom)
  // const [activePlaylist, setActivePlaylist] = useAtom(activePlaylistAtom)
  const [activeDevice] = useAtom(activeDeviceAtom)
  //   const albumOrPodcast =
  //     track.track.type === 'track'
  //       ? (track.track as Track).album
  //       : (track.track as Episode).show

  //   useEffect(() => {
  //     ;(async () => {
  //       if (track.track.type === 'track') {
  //         const isSaved = await checkIfItemIsSaved(
  //           (track.track as Track).id,
  //           'tracks'
  //         )
  //         setIsSaved(isSaved)
  //       } else {
  //         const isSaved = await checkIfItemIsSaved(
  //           (track.track as Episode).id,
  //           'episodes'
  //         )
  //         setIsSaved(isSaved)
  //       }
  //     })()
  //   }, [track, checkIfItemIsSaved])

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
        // setActivePlaylist(contextUri)
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
      //   if (track.track.type === 'track') {
      //     await removeItem((track.track as Track).id, 'tracks')
      //   } else {
      //     await removeItem((track.track as Episode).id, 'episodes')
      //   }
      //   setIsSaved(false)
      // } else {
      //   if (track.track.type === 'track') {
      //     await saveItem((track.track as Track).id, 'tracks')
      //   } else {
      //     await saveItem((track.track as Episode).id, 'episodes')
      //   }
      //   setIsSaved(true)
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
      aria-rowindex={index + 1}
    >
      <TrackListColumn className='grid-item' aria-colindex={1} role='gridcell'>
        <span className='py-2 text-xs text-subdued-foreground flex items-center gap-3 truncate'>
          <CoverImage
            className='w-10 h-10 shrink-0'
            src={
              track.type === 'track' && (track as Track).album.images[0]
                ? (track as Track).album.images[0].url
                : undefined
            }
            alt={track.name}
            icon='music'
          />
          <ItemTitle
            title={track.name}
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
      <TrackListColumn className='grid-item' aria-colindex={2} role='gridcell'>
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
        <span className='text-xs max-w-full mr-3 truncate font-medium text-subdued'>
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

export { SearchTrackItem }
