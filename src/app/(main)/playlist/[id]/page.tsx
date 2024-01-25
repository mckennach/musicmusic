import {
  fetchPlaylist,
  fetchPlaylistOwner,
  getRecommendations
} from '@/services/server/queries'
import { Playlist as PlaylistProps } from '@spotify/web-api-ts-sdk'
import { getServerSession } from 'next-auth'

import { Suspense } from 'react'

import { authOptions } from '@/lib/auth/auth-options'

import { Clock } from 'lucide-react'

import { ControlBar } from '@/components/organisms/control-bar'
import { PlaylistHero } from '@/components/organisms/playlist/playlist-hero'
import { Recommendations } from '@/components/organisms/recommendations'
import {
  TrackList,
  TrackListHeaderItems
} from '@/components/organisms/track-list'
import { BackgroundFade } from '@/components/ui/background-fade'

import { AuthSession } from '@/types/database.ds'

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
    title: 'Album',
    value: 'album'
  },
  {
    title: 'Date added',
    value: 'date'
  },
  {
    title: 'Length',
    value: 'length',
    icon: <Clock size={16} className='mr-8' />
  }
]

export default async function Playlists({
  params
}: {
  params: { id: string }
}) {
  const session: AuthSession | null = await getServerSession(authOptions)
  const playlist: PlaylistProps | null = await fetchPlaylist(
    session as AuthSession,
    params.id
  )
  const owner = playlist
    ? await fetchPlaylistOwner(session as AuthSession, playlist.owner.id)
    : null
  const recommendations =
    session && playlist
      ? await getRecommendations(session, {
          limit: 10,
          seed_tracks: playlist?.tracks?.items
            .slice(0, 5)
            .map((item) => item.track.id)
        })
      : null

  if (!playlist) return null
  return (
    <div className='under-header'>
      <Suspense fallback={<p>Loading hero...</p>}>
        <PlaylistHero session={session} playlist={playlist} />
      </Suspense>
      <section className=' relative h-full bg-card isolate'>
        <BackgroundFade className='faade m-0 top-0 isolate animate-fade-in' />
        <ControlBar id={params.id} />

        <div className='content-spacing'>
          <TrackList
            id={params.id}
            contextUri={playlist?.uri}
            tracks={playlist?.tracks?.items || []}
            columnCount={5}
            type='playlist'
            headerItems={headerItems}
          />
        </div>

        <Suspense fallback={<p>Loading recommendations...</p>}>
          <Recommendations
            recommendations={recommendations || []}
            playlist={playlist}
            session={session}
            description="Based on what's in this playlist"
          />
        </Suspense>
      </section>
    </div>
  )

  // return <Playlist id={params?.id} playlist={playlist} owner={owner} />
}
