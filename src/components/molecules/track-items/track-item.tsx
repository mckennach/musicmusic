'use client'

import { useSpotify } from '@/hooks'
import { Episode, PlaylistedTrack, Track } from '@spotify/web-api-ts-sdk'
import { useOnClickOutside } from 'usehooks-ts'

import React, { useEffect, useRef, useState } from 'react'

import { useAtom } from 'jotai'

import { activeDeviceAtom, playbackStateAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'

import { Play } from 'lucide-react'

import { TrackListColumn, TrackListRow } from '@/components/ui/track-list'

interface TrackItemProps extends React.HTMLAttributes<HTMLDivElement> {
  track: PlaylistedTrack
  index: number
  contextUri: string
}

const TrackItem = ({ track, index, contextUri, ...props }: TrackItemProps) => {
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
  // const [, syncPlayback] = useAtom(asyncPlaybackAtom)
  // const [activePlaylist, setActivePlaylist] = useAtom(activePlaylistAtom)
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
      <TrackListColumn className='grid-item relative' data-colindex={1}>
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
      <TrackListColumn className='grid-item' data-colindex={2}>
        <span className='py-2 text-xs text-subdued-foreground flex items-center gap-3 truncate'>
          title
        </span>
      </TrackListColumn>
    </TrackListRow>
  )
}

export { TrackItem }
