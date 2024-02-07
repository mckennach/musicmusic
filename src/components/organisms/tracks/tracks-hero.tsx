'use server'

// import { fetchPlaylistOwner } from '@/services/server/queries'
import { Page, SavedTrack } from '@spotify/web-api-ts-sdk'

import Link from 'next/link'

import { UserAvatar } from '../../ui/user-avatar'
import { Hero } from '../hero'

import { formatNumber } from '@/lib/utils'
import { AuthSession } from '@/types/database.ds'
export async function TracksHero({
  session,
  tracks
}: {
  session: AuthSession | null
  tracks: Page<SavedTrack>
}) {
  return (
    <Hero
      title={'Liked Songs'}
      subtitle={'Playlist'}
      imageSize='cover'
      imageSrc={undefined}
      imageIcon='heart'
      imageClassName='tracks-image'
      fallbackClassName='bg-gradient-to-br from-[#7f3ffb] from-20% to-[#ffffff] to-100%'
      extraInfo={
        <>
          <span className='flex items-center gap-1 text-xs font-normal'>
            <span className='flex items-center gap-1'>
              <UserAvatar
                src={session?.user?.image}
                alt={`${session?.user.name} avatar`}
                className='h-5 w-5 border-none'
                name={'Artist'}
                icon='music'
                size='md'
              />
              <span className='text-sm font-medium hover:underline'>
                <Link href={`/`}>{session?.user.name}</Link>
              </span>
            </span>{' '}
            {'·'} <span className=''>{formatNumber(tracks.total)} songs</span>
          </span>
        </>
      }
    />
  )
}
