'use client'

import { PlayHistory } from '@spotify/web-api-ts-sdk'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useAtom } from 'jotai'

import { sessionAtom } from '@/lib/atoms'

import { CardButtonSkeleton } from '../ui/card-button'
import {
  CardSection,
  CardSectionHeading,
  CardSectionItems
} from '../ui/card-section'

export function SearchPage({ ...props }) {
  const [session] = useAtom(sessionAtom)
  const router = useRouter()
  const [recentlySearched, setRecentlySearched] = useState<
    PlayHistory[] | null
  >()
  return (
    <div className='flex flex-col px-4 pb-12'>
      <div className='flex flex-col isolate pt-2 bg-transparent'>
        <div className='flex flex-wrap gap-8'>
          <CardSection>
            {recentlySearched && session && (
              <CardSectionHeading>
                <h2 className='text-white font-bold text-2xl'>
                  Recent searches
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
              {recentlySearched && session ? (
                <>
                  {/* {playlists?.map((item, i) => (
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
                    ))} */}
                </>
              ) : (
                <>
                  {Array(5)
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
  )
}
