'use client'

import { useSpotify } from '@/hooks'
import { Episode, Track } from '@spotify/web-api-ts-sdk'
import { useOnClickOutside } from 'usehooks-ts'

import React, { useEffect, useRef, useState } from 'react'

import { useAtom } from 'jotai'

import { activeDeviceAtom, playbackStateAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { TrackKeys } from '@/types/database.ds'
import { AlbumTrackItem } from './album-track-item'
import { ArtistTopTrackItem } from './artist-top-track-item'

interface TrackItemProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  track: Track | Episode
  index: number
  type: TrackKeys
  contextUri: string
  colCount: number
}

export function TrackItem({ track, ...props }: TrackItemProps) {
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
  const [activeDevice] = useAtom(activeDeviceAtom)

  useEffect(() => {
    ;(async () => {
      if (track.type === 'track') {
        const isSaved = await checkIfItemIsSaved((track as Track).id, 'tracks')
        setIsSaved(isSaved)
      } else {
        const isSaved = await checkIfItemIsSaved(
          (track as Episode).id,
          'episodes'
        )
        setIsSaved(isSaved)
      }
    })()
  }, [track, checkIfItemIsSaved])

  const handleDoubleClick = async () => {
    console.log('double click')
    console.log(track.uri)
    // if (activeDevice && activeDevice?.id) {
    //   await startResumePlayback(
    //     activeDevice?.id,
    //     contextUri,
    //     undefined,
    //     index,
    //     0
    //   )
    //   getPlaybackState().then((playbackState) => {
    //     setPlaybackState(playbackState)
    //     setActivePlaylist(contextUri)
    //   })
    // }
  }

  const handleSaveItem = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isSaved: boolean
  ) => {
    e.preventDefault()
    if (isSaved) {
      if (track.type === 'track') {
        await removeItem((track as Track).id, 'tracks')
      } else {
        await removeItem((track as Episode).id, 'episodes')
      }
      setIsSaved(false)
    } else {
      if (track.type === 'track') {
        await saveItem((track as Track).id, 'tracks')
      } else {
        await saveItem((track as Episode).id, 'episodes')
      }
      setIsSaved(true)
    }
  }

  const handleClickOutside = () => {
    setIsSelected(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  if (props.type === 'album') {
    return (
      <AlbumTrackItem
        track={track as Track}
        onClick={() => setIsSelected(!isSelected)}
        onDoubleClick={handleDoubleClick}
        isSelected={isSelected}
        className={cn(
          `group cursor-pointer rounded-sm overflow-hidden`,
          isSelected
            ? 'bg-[hsla(0,0%,100%,.3)] hover:bg-[hsla(0,0%,100%,.3)]'
            : 'hover:bg-tinted-higlight'
        )}
        role='row'
        ref={ref}
        isSaved={isSaved}
        handleSaveItem={handleSaveItem}
        {...props}
      />
    )
  }

  if (props.type === 'top-tracks') {
    return (
      <ArtistTopTrackItem
        track={track as Track}
        onClick={() => setIsSelected(!isSelected)}
        onDoubleClick={handleDoubleClick}
        isSelected={isSelected}
        className={cn(
          `group cursor-pointer rounded-sm overflow-hidden`,
          isSelected
            ? 'bg-[hsla(0,0%,100%,.3)] hover:bg-[hsla(0,0%,100%,.3)]'
            : 'hover:bg-tinted-higlight'
        )}
        role='row'
        ref={ref}
        isSaved={isSaved}
        handleSaveItem={handleSaveItem}
        {...props}
      />
    )
  }
}
