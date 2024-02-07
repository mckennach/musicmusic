'use client'

import {
  TrackListBody,
  TrackListColumn,
  TrackList as TrackListContainer,
  TrackListHeading,
  TrackListRow
} from '@/components/ui/track-list'
import { GsapContext, GsapContextProps } from '@/context'
import type { TrackListProps } from '@/types/database.ds'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useContext, useEffect, useState } from 'react'
import { TrackItem } from './track-item'

export function TrackList({
  id,
  contextUri,
  tracks,
  columnCount,
  type,
  headerItems
}: TrackListProps) {
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
          return (
            <TrackItem
              key={index}
              id={id}
              track={track}
              index={index}
              type={type}
              contextUri={contextUri}
              colCount={columnCount}
            />
          )
        })}
      </TrackListBody>
    </TrackListContainer>
  )
}
