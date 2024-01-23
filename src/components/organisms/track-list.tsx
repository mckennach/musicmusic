import {
  Episode,
  Playlist,
  PlaylistedTrack,
  Show,
  Track,
  User
} from '@spotify/web-api-ts-sdk'

import {
  TrackListBody,
  TrackList as TrackListContainer,
  TrackListGrid,
  TrackListGridItem,
  TrackListHeading
} from '@/components/ui/track-list'

import { PlaylistTrackItem } from '../molecules/track-items'
import { TrackItem } from '../molecules/track-items/track-item'

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
      <TrackListBody className='body'>
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
