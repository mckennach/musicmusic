'use server'

import { Album, Tracks } from '@spotify/web-api-ts-sdk'
// import { TrackList, TrackListHeaderItems } from '@/components/organisms/track-list'
import { TrackList } from '@/components/molecules/tracks/track-list'
import { fetchTracks } from '@/services/server/queries/tracks.queries'
import { AuthSession, TrackListHeaderItems } from '@/types/database.ds'
import { Clock } from 'lucide-react'
interface AlbumTrackListProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  album: Album
  session: AuthSession
}

const headerItems: TrackListHeaderItems[] = [
  {
    title: '#',
    value: 'index',
    className: 'w-6'
  },
  {
    title: 'Title',
    value: 'title'
  },
  {
    title: 'Length',
    value: 'length',
    icon: <Clock size={16} className='mr-8' />
  }
]

export async function AlbumTrackList({
  id,
  album,
  session,
  ...props
}: AlbumTrackListProps) {
  const trackIds = album.tracks.items.map((track) => track.id)

  const tracks: Tracks =
    trackIds.length > 0 ? await fetchTracks(trackIds, session) : null

  return (
    <div className='content-spacing'>
      <TrackList
        id={id}
        contextUri={album.uri}
        tracks={tracks.tracks}
        columnCount={3}
        type='album'
        headerItems={headerItems}
      />
    </div>
  )
}
