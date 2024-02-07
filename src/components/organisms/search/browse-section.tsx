'use server'
import { CardButtonSkeleton } from '@/components/ui/card-button'
// import { CardButton } from '@/components/molecules/cards/card-button'
import {
  CardSection,
  CardSectionHeading,
  CardSectionItems
} from '@/components/ui/card-section'
import { LoadedImage } from '@/components/ui/image'
import { randomColors } from '@/lib/utils'
import Link from 'next/link'

import { fetchBrowseCategories } from '@/services/server/queries/browse.queries'
import { AuthSession } from '@/types/database.ds'
import { Categories } from '@spotify/web-api-ts-sdk'
export async function SearchBrowse({
  session
}: {
  session: AuthSession | null
}) {
  const categories: Categories | null = session
    ? await fetchBrowseCategories(session)
    : null

  return (
    <CardSection className='relative'>
      {session && (
        <CardSectionHeading>
          <h2 className='text-white font-bold text-2xl'>Browse all</h2>
        </CardSectionHeading>
      )}
      <CardSectionItems
        gridCols={5}
        gap={3}
        className='!auto-rows-auto card-section__browse-items'
      >
        {session && categories && categories?.categories?.items ? (
          <>
            {categories?.categories?.items?.map((item, i) => {
              // const randomColor = Math.floor(Math.random() * 16777215).toString(16)
              const randomColor =
                randomColors[Math.floor(Math.random() * randomColors.length)]
              return (
                <Link
                  href='/'
                  className='rounded-lg border-none overflow-hidden w-full relative text-card-foreground shadow-sm after:block after:pb-[100%]'
                  key={i}
                  style={{
                    backgroundColor: `${randomColor}`
                  }}
                >
                  <div>
                    <span className='p-4 absolute break-words text-wrap max-w-full font-bold text-xl '>
                      {item?.name}
                    </span>
                    <div className='absolute bottom-0 right-0 !h-[100px] !w-[100px]  transform rotate-[25deg] translate-x-[18%] translate-y-[-2%]'>
                      <LoadedImage
                        src={item?.icons[0]?.url}
                        fill={true}
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                        sizes='100px'
                        alt={item?.name + ' cover image'}
                        className='rounded-sm shadow-sm'
                      />
                    </div>
                  </div>
                </Link>
              )
            })}
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
  )
}
