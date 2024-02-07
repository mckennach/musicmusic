'use server'

// import { fetchPlaylistOwner } from '@/services/server/queries'
import { Album, Artist } from '@spotify/web-api-ts-sdk'

import Link from 'next/link'

import { UserAvatar } from '../../ui/user-avatar'
import { Hero } from '../hero'

import { millisToMinutesAndSeconds } from '@/lib/utils'
import { AuthSession } from '@/types/database.ds'
export async function AlbumHero({
  album,
  artist,
  session
}: {
  album: Album | null
  artist: Artist | null
  session: AuthSession | null
}) {
  if (!album || !artist) return null
  const artistImage =
    album?.artists[0]?.images && album?.artists[0]?.images[0].url
  const durationFromTracks = album?.tracks?.items.reduce(
    (acc, cur) => acc + cur.duration_ms,
    0
  )

  return (
    <Hero
      title={album.name}
      subtitle={'Album'}
      imageSize='cover'
      imageSrc={album?.images && album?.images[0].url}
      extraInfo={
        <>
          <span className='flex items-center gap-1 text-xs font-normal'>
            <span className='flex items-center gap-1'>
              <UserAvatar
                src={artist.images && artist.images[0].url}
                alt={`${artist.name} avatar`}
                className='h-5 w-5 border-none'
                name={'Artist'}
                icon='music'
                size='md'
              />
              <span className='text-sm font-bold hover:underline'>
                <Link href={`/artist/${artist.id}`}>{artist.name}</Link>
              </span>
            </span>{' '}
            {'·'} <span className=''>{album.release_date.split('-')[0]}</span>{' '}
            {'·'}{' '}
            <span>
              {album.total_tracks} {album.total_tracks > 1 ? 'songs' : 'song'},{' '}
              {millisToMinutesAndSeconds(durationFromTracks, true)}
            </span>
          </span>
        </>
      }
    />
  )

  // return (
  //   <Hero
  //     title={album ? album.name : ''}
  //     subtitle={'Album'}
  //     description={'Album description'}
  //     extraInfo={
  //       <>
  //         <UserAvatar
  //           src={album?.artists[0]?.images && album?.artists[0]?.images[0].url}
  //           alt={`${album?.artists[0]?.name} avatar`}
  //           className='h-6 w-6'
  //           name={'User'}
  //           icon='user'
  //           size='md'
  //         />
  //         <span className='text-xs font-normal'>
  //           {/* Created by{' '}
  //           <Link href={`/user/${playlist?.owner?.id}`}>
  //             <span className='font-medium'>
  //               {playlist?.owner?.display_name}
  //             </span>
  //           </Link>{' '}
  //           · {playlist?.followers?.total} likes · {playlist?.tracks?.total}{' '}
  //           songs · {playlist?.public ? 'Public' : 'Private'} ·{' '}
  //           {playlist?.collaborative ? 'Collaborative' : 'Not Collaborative'} */}
  //         </span>
  //       </>
  //     }
  //     imageSrc={album?.images && album?.images[0].url}
  //     imageIcon='music'
  //     imageSize='cover'
  //   />
  // )
}
