'use server'

import { fetchPlaylistOwner } from '@/services/server/queries'
import { Playlist } from '@spotify/web-api-ts-sdk'

import Link from 'next/link'

import { UserAvatar } from '../../ui/user-avatar'
import { Hero } from '../hero'

import { AuthSession } from '@/types/database.ds'

export async function PlaylistHero({
  playlist,
  session
}: {
  playlist: Playlist | null
  session: AuthSession | null
}) {
  const owner = playlist
    ? await fetchPlaylistOwner(session as AuthSession, playlist.owner.id)
    : null
  return (
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
  )
}
