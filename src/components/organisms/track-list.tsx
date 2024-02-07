'use client'

import { GsapContext, GsapContextProps } from '@/context'
import { useGSAP } from '@gsap/react'
import { Playlist, SimplifiedTrack, Track } from '@spotify/web-api-ts-sdk'
import gsap from 'gsap'

import { useContext, useEffect, useState } from 'react'

import {
  TrackListBody,
  TrackListColumn,
  TrackList as TrackListContainer,
  TrackListHeading,
  TrackListRow
} from '@/components/ui/track-list'

import { RecommendationTrackItem } from '../molecules/recommendations/recommendation-track-item'
import { ArtistTrackItem, PlaylistTrackItem } from '../molecules/track-items'
import { SearchTrackItem } from './search/search-track-item'

export interface TrackListHeaderItems {
  title: string
  value: string
  className?: string
  icon?: React.ReactNode
}

export interface TrackListProps {
  id: string
  contextUri: string
  tracks: Playlist['tracks']['items'] | Track[] | SimplifiedTrack[]
  columnCount: number
  type:
    | 'playlist'
    | 'album'
    | 'show'
    | 'episode'
    | 'recommendations'
    | 'artist'
    | 'search'
  headerItems?: TrackListHeaderItems[]
}

export function TrackList({
  id,
  contextUri,
  tracks,
  columnCount,
  type,
  headerItems
}: TrackListProps) {
  // const gsapRef = useGsapContext()
  // const [ref, setRef] = useState<GsapContextProps>()
  const gsapRef = useContext(GsapContext)
  const [ref, setRef] = useState<GsapContextProps>()
  useEffect(() => {
    if (gsapRef?.current) {
      setRef(gsapRef)
    }
  }, [gsapRef])

  useGSAP(
    () => {
      if (type !== 'playlist') return
      gsap
        .timeline({
          scrollTrigger: {
            scroller: '.main-view-container__viewport',
            trigger: '.track-list-body',
            start: '-=128 top',
            end: 'top-=64 bottom',
            scrub: 0.6
            // markers: true
          }
        })
        .set('.track-list__grid.heading', {
          borderBottomColor: 'hsla(0, 0%, 100%, 0.1)'
        })
        .to('.track-list__grid.heading', {
          borderBottomColor: 'hsla(0, 0%, 100%, 0)'
        })
        .set('.track-list-heading', {
          '--heading-bar-opacity': 0
        })
        .to('.track-list-heading', {
          '--heading-bar-opacity': 1
        })
    },
    {
      scope: ref,
      dependencies: [ref]
    }
  )

  return (
    <TrackListContainer
      className=''
      aria-colcount={columnCount}
      data-colcount={columnCount}
      aria-rowcount={tracks?.length}
      tabIndex={0}
    >
      {headerItems && headerItems.length > 0 && (
        <TrackListHeading>
          <TrackListRow className='heading text-sm'>
            {headerItems.map((item, index) => {
              return (
                <TrackListColumn
                  key={index}
                  role='columnheader'
                  className={item.className}
                  aria-colindex={index + 1}
                >
                  <span className=''>{item.icon ? item.icon : item.title}</span>
                </TrackListColumn>
              )
            })}
          </TrackListRow>
        </TrackListHeading>
      )}

      <TrackListBody className='track-list-body' height={56 * tracks?.length}>
        {tracks.map((track, index) => {
          if (type === 'playlist')
            return (
              <PlaylistTrackItem
                key={(track as Playlist['tracks']['items'][0]).track.id}
                playlistId={id}
                track={track as Playlist['tracks']['items'][0]}
                index={index}
                contextUri={contextUri}
              />
            )
          if (type === 'album')
            return (
              <>ALBUM</>
              // <AlbumTrackItem
              //   key={(track as Playlist['tracks']['items'][0]).track.id}
              //   playlistId={id}
              //   track={track as Playlist['tracks']['items'][0]}
              //   index={index}
              //   contextUri={contextUri}
              // />
            )
          if (type === 'recommendations')
            return (
              <RecommendationTrackItem
                id={(track as Track).id}
                playlistId={id}
                key={(track as Track).id}
                track={track as Track}
                index={index}
                contextUri={contextUri}
              />
            )
          if (type === 'artist')
            return (
              <ArtistTrackItem
                id={(track as Track).id}
                artistId={id}
                key={(track as Track).id}
                track={track as Track}
                index={index}
                contextUri={contextUri}
              />
            )
          if (type === 'search')
            return (
              <SearchTrackItem
                id={(track as Track).id}
                key={(track as Track).id}
                track={track as Track}
                index={index}
                contextUri={contextUri}
              />
            )
        })}
      </TrackListBody>
    </TrackListContainer>
  )
}
