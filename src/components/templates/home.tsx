'use client'

import {
  Artist,
  MaxInt,
  Page,
  PlayHistory,
  SimplifiedPlaylist
} from '@spotify/web-api-ts-sdk'
import { useSession } from 'next-auth/react'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useAtom } from 'jotai'

import { sessionAtom } from '@/lib/atoms'
import spotify from '@/lib/spotify-sdk'

import { BackgroundFade } from '@/components/ui/background-fade'

import { TopItems } from '../molecules/home/top-items'
import { CardButton, CardButtonSkeleton } from '../ui/card-button'
import {
  CardSection,
  CardSectionHeading,
  CardSectionItems
} from '../ui/card-section'

export function Home() {
  const { data: session1, status } = useSession()
  const router = useRouter()
  const [session] = useAtom(sessionAtom)
  const curHr = new Date().getHours()
  const [columnCardsCount, setColumnCardsCount] = useState<MaxInt<50>>(5)
  const [rowCardsCount, setRowCardsCount] = useState<MaxInt<50>>(6)

  const greeting =
    curHr < 12 ? 'Good Morning' : curHr < 18 ? 'Good Afternoon' : 'Good Evening'
  const [topItems, setTopItems] = useState<Page<Artist>['items'] | null>(null)
  const [recentlyPlayed, setRecentlyPlayed] = useState<PlayHistory[] | null>(
    null
  )
  const [playlists, setPlaylists] = useState<
    Page<SimplifiedPlaylist>['items'] | null
  >(null)

  useEffect(() => {
    ;(async () => {
      if (!rowCardsCount) return
      const data = await spotify.currentUser.topItems(
        'artists',
        'short_term',
        rowCardsCount
      )
      if (data && data?.items) setTopItems(data?.items)
    })()
  }, [rowCardsCount])

  useEffect(() => {
    ;(async () => {
      if (!columnCardsCount) return
      const recentTracks =
        await spotify.player.getRecentlyPlayedTracks(columnCardsCount)
      if (recentTracks) setRecentlyPlayed(recentTracks.items)

      const playlistData =
        await spotify.currentUser.playlists.playlists(columnCardsCount)
      if (playlistData && playlistData?.items) setPlaylists(playlistData?.items)
    })()
  }, [columnCardsCount])

  return (
    <>
      <BackgroundFade className='h-[350px]' />
      <div className='flex flex-col px-4 pb-12'>
        <div className='flex flex-col isolate pt-2 bg-transparent'>
          <div className='flex flex-wrap gap-8'>
            <TopItems items={topItems} cardCount={rowCardsCount} />

            <CardSection>
              {playlists && session && (
                <CardSectionHeading>
                  <h2 className='text-white font-bold text-2xl'>
                    Your playlists
                  </h2>
                  <Link
                    href={`/sections/${session?.user?.id}/playlists`}
                    className='text-sm font-semibold text-subdued hover:underline'
                  >
                    Show all
                  </Link>
                </CardSectionHeading>
              )}

              <CardSectionItems gridCols={5} gap={3} className='grid-cols-5'>
                {playlists && session ? (
                  <>
                    {playlists?.map((item, i) => (
                      <CardButton
                        key={i}
                        onClick={() =>
                          router.push(`/${item?.type}/${item?.id}`)
                        }
                        className='bg-[#181818]'
                        dir='column'
                        name={item?.name}
                        label={`By ${item?.owner?.display_name}`}
                        imageSrc={item?.images[0]?.url}
                        imageAlt={item?.name + ' cover image'}
                        imageIcon='music'
                        imageClassName='w-full h-full'
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {Array(columnCardsCount)
                      .fill(0)
                      .map((_, i) => (
                        <CardButtonSkeleton
                          key={i}
                          imageClassName='w-full h-full'
                          dir='column'
                        />
                      ))}
                  </>
                )}
              </CardSectionItems>
            </CardSection>

            <CardSection>
              {recentlyPlayed && session && (
                <CardSectionHeading>
                  <h2 className='text-white font-bold text-2xl'>
                    Recently Played
                  </h2>
                  <Link
                    href={`/sections/${session?.user?.id}/recently-played`}
                    className='text-sm font-semibold text-subdued hover:underline'
                  >
                    Show all
                  </Link>
                </CardSectionHeading>
              )}

              <CardSectionItems gridCols={5} gap={3} className='grid-cols-5'>
                {recentlyPlayed && session ? (
                  <>
                    {recentlyPlayed?.map((item, i) => (
                      <CardButton
                        key={i}
                        onClick={() =>
                          router.push(
                            `/${item?.track?.type}/${item?.track?.id}`
                          )
                        }
                        className='bg-[#181818] hover:bg-[#282828]/80 active:bg-[#282828]'
                        dir='column'
                        name={item?.track?.name}
                        label={item?.track?.artists[0]?.name}
                        imageSrc={item?.track?.album?.images[0]?.url}
                        imageAlt={item?.track?.album?.name + ' cover image'}
                        imageIcon='music'
                        imageClassName='w-full h-full'
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {Array(columnCardsCount)
                      .fill(0)
                      .map((_, i) => (
                        <CardButtonSkeleton
                          key={i}
                          imageClassName='w-full h-full'
                          dir='column'
                        />
                      ))}
                  </>
                )}
              </CardSectionItems>
            </CardSection>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
