// import {
//   PlaylistControls,
//   PlaylistHero,
//   PlaylistTrackList
// } from '@/components/templates/playlist'
// import { getPlaylistById } from '@/services/server'
import { Playlist as PlaylistProps } from '@spotify/web-api-ts-sdk'
import {
  Page,
  Playlist,
  PlaylistedTrack,
  QueryAdditionalTypes,
  TrackItem,
  User
} from '@spotify/web-api-ts-sdk'
import { getServerSession } from 'next-auth'

import Link from 'next/link'

import { authOptions } from '@/lib/auth/auth-options'

import { Clock } from 'lucide-react'

import { ControlBar } from '@/components/organisms/control-bar'
import { Hero } from '@/components/organisms/hero'
import { Recommendations } from '@/components/organisms/recommendations'
import {
  TrackList,
  TrackListHeaderItems
} from '@/components/organisms/track-list'
import { BackgroundFade } from '@/components/ui/background-fade'
import { UserAvatar } from '@/components/ui/user-avatar'

import { AuthSession } from '@/types/database.ds'
import { fetchPlaylistOwner, fetchPlaylist, getRecommendations } from '@/services/server/queries'
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
    : null;
  const recommendations = session && playlist ? await getRecommendations(session, {
    limit: 10,
    seed_tracks: playlist?.tracks?.items
      .slice(0, 5)
      .map((item) => item.track.id)
  }) : null;
    
  if (!playlist) return null;
  return (
    <div className='under-header'>
      <Hero
        title={playlist ? playlist.name : ''}
        subtitle={playlist?.public ? 'Public Playlist' : 'Playlist'}
        description={playlist?.description}
        extraInfo={
          <>
            <UserAvatar
              src={owner?.images && owner?.images[0].url}
              alt={`${playlist?.owner?.display_name} avatar`}
              className='h-6 w-6'
              name={'User'}
              icon='user'
              size='md'
            />
            <span className='text-xs font-normal'>
              Created by{' '}
              <Link href={`/user/${playlist?.owner?.id}`}>
                <span className='font-medium'>
                  {playlist?.owner?.display_name}
                </span>
              </Link>{' '}
              · {playlist?.followers?.total} likes · {playlist?.tracks?.total}{' '}
              songs · {playlist?.public ? 'Public' : 'Private'} ·{' '}
              {playlist?.collaborative ? 'Collaborative' : 'Not Collaborative'}
            </span>
          </>
        }
        imageSrc={playlist?.images && playlist?.images[0].url}
        imageIcon='music'
        imageSize='cover'
      />
      <section className='relative h-full content-spacing'>
        <BackgroundFade className='faade m-0 top-0 isolate' />
        <ControlBar id={params.id} />
        <TrackList
          id={params.id}
          contextUri={playlist?.uri}
          tracks={playlist?.tracks?.items || []}
          columnCount={5}
          type='playlist'
          headerItems={headerItems}
        />
        <Recommendations
          recommendedTracks={recommendations?.tracks || []}
          playlist={playlist}
          description="Based on what's in this playlist"
        />
      </section>
    </div>
  )

  // return <Playlist id={params?.id} playlist={playlist} owner={owner} />
}
