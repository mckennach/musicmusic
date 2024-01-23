import { GsapContextProps, useGsapContext } from '@/context'
import { useGSAP } from '@gsap/react'
import { Playlist } from '@spotify/web-api-ts-sdk'
import gsap from 'gsap'

import { useEffect, useState } from 'react'

import {
  TrackListBody,
  TrackList as TrackListContainer,
  TrackListGrid,
  TrackListGridItem,
  TrackListHeading
} from '@/components/ui/track-list'

import { PlaylistTrackItem } from '../molecules/track-items'

export interface TrackListHeaderItems {
  title: string
  value: string
  className?: string
  icon?: React.ReactNode
}

export interface TrackListProps {
  id: string
  contextUri: string
  tracks: Playlist['tracks']['items']
  columnCount: number
  type: 'playlist' | 'album' | 'show' | 'episode'
  headerItems: TrackListHeaderItems[]
}

export function TrackList({
  id,
  contextUri,
  tracks,
  columnCount,
  type,
  headerItems
}: TrackListProps) {
  const gsapRef = useGsapContext()
  const [ref, setRef] = useState<GsapContextProps>()

  useEffect(() => {
    if (gsapRef?.current) {
      setRef(gsapRef)
    }
  }, [gsapRef])

  useGSAP(
    () => {
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
          '--top-bar-opacity': 0
        })
        .to('.track-list-heading', {
          '--top-bar-opacity': 1
        })
    },
    {
      scope: ref,
      dependencies: [ref]
    }
  )

  return (
    <TrackListContainer className='' data-colcount={columnCount}>
      <TrackListHeading>
        <TrackListGrid className='heading text-sm'>
          {headerItems.map((item, index) => {
            return (
              <TrackListGridItem
                key={index}
                className={item.className}
                data-colindex={index + 1}
              >
                <span className=''>{item.icon ? item.icon : item.title}</span>
              </TrackListGridItem>
            )
          })}
        </TrackListGrid>
      </TrackListHeading>
      <TrackListBody className='track-list-body'>
        {tracks.map((track, index) => {
          if (type === 'playlist')
            return (
              <PlaylistTrackItem
                key={track.track.id}
                playlistId={id}
                track={track}
                index={index}
                contextUri={contextUri}
              />
            )
        })}
      </TrackListBody>
    </TrackListContainer>
  )
}
