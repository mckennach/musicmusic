'use client'

import { PlayHistory } from '@spotify/web-api-ts-sdk'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { useAtom } from 'jotai'

import { columnCountAtom, recentSearchesAtom } from '@/lib/atoms'
// import { CardButton } from '@/components/molecules/cards/card-button'
// import { CardButtonSkeleton } from '@/components/molecules/cards/card-button'
import { CardButtonVertical } from '@/components/molecules/cards/card-button'
import { CardButtonSkeleton } from '@/components/ui/card-button'
import {
  CardSection,
  CardSectionHeading,
  CardSectionItems
} from '@/components/ui/card-section'
import { AuthSession } from '@/types/database.ds'

export function SearchRecentSearches({
  session
}: {
  session: AuthSession | null
}) {
  const [columnCount] = useAtom(columnCountAtom)
  const [recentSearches, setRecentSearches] = useAtom(recentSearchesAtom)
  const router = useRouter()
  const [recentlySearched, setRecentlySearched] = useState<
    PlayHistory[] | null
  >()

  const handleRemoveRecentSearch = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation()
    const newRecentSearches = [...recentSearches]
    newRecentSearches.splice(index, 1)
    setRecentSearches(newRecentSearches)
  }

  return (
    <CardSection className='relative'>
      {session && (
        <CardSectionHeading>
          <h2 className='text-white font-bold text-2xl'>Recent searches</h2>
        </CardSectionHeading>
      )}
      <CardSectionItems gridCols={columnCount} gap={3} className='grid-cols-5'>
        {session && recentSearches && recentSearches.length > 0 ? (
          <>
            {recentSearches?.slice(0, columnCount).map((item, i) => (
              <CardButtonVertical
                key={i}
                onClick={() => {
                  router.push(`/${item?.type}/${item?.id}`)
                }}
                className='bg-[#181818] hover:bg-[#282828] focus-within:bg-[#282828]'
                imageSrc={item?.images[0]?.url}
                imageAlt={item?.name + ' cover image'}
                title={item?.name}
                contextUri={item?.uri}
                label={<span className='capitalize'>{item.type}</span>}
              />
              // <CardButton
              //   key={i}
              //   onClick={() => {
              //     router.push(`/${item?.type}/${item?.id}`)
              //   }}
              //   className='bg-[#181818] hover:bg-[#282828] focus-within:bg-[#282828]'
              // >
              //   <CardButtonCloseTrigger
              //     onClick={(e) => handleRemoveRecentSearch(e, i)}
              //     className='bg-[rgba(0,0,0,.3)] hover:scale-110 transition-all duration-100 ease-linear'
              //   />
              //   <CardButtonContent>
              //     <CardButtonImage
              //       dir='column'
              //       src={item?.images[0]?.url}
              //       alt={item?.name + ' cover image'}
              //       className={cn(
              //         'w-full h-full',
              //         item?.type === 'artist' && 'rounded-full'
              //       )}
              //     >
              //       <CardButtonPlayButton
              //         contextUri={item?.uri}
              //         fade={true}
              //         fadeDir='up'
              //         className='absolute bottom-1 right-1 transform -translate-x-1 -translate-y-[-20px] opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 ease-in-out'
              //       />
              //     </CardButtonImage>
              //     <CardButtonText
              //       dir='column'
              //       title={item?.name}
              //       label={<span className='capitalize'>{item.type}</span>}
              //       className='text-white'
              //     />
              //   </CardButtonContent>
              // </CardButton>
            ))}
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
