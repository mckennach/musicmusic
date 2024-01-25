'use client'

import { Artist, Page } from '@spotify/web-api-ts-sdk'

import React from 'react'

import { useRouter } from 'next/navigation'

import { useAtom } from 'jotai'

import { sessionAtom } from '@/lib/atoms'

import { CardButton, CardButtonSkeleton } from '@/components/ui/card-button'
import {
  CardSection,
  CardSectionHeading,
  CardSectionItems
} from '@/components/ui/card-section'

interface HomeSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Page<Artist>['items'] | null
  cardCount: number
}

const HomeSection = React.forwardRef<HTMLDivElement, HomeSectionProps>(
  ({ items, cardCount = 6, ...props }, ref) => {
    const router = useRouter()
    const [session] = useAtom(sessionAtom)
    const curHr = new Date().getHours()
    const greeting =
      curHr < 12
        ? 'Good Morning'
        : curHr < 18
          ? 'Good Afternoon'
          : 'Good Evening'
    return (
      <CardSection {...props} ref={ref}>
        {items && (
          <CardSectionHeading>
            <h2 className='text-white font-bold text-3xl'>{greeting}</h2>
          </CardSectionHeading>
        )}
        <CardSectionItems gridCols={3} gap={3} className='grid-cols-3'>
          {items && session ? (
            <>
              {items?.map((item, i) => (
                <CardButton
                  key={i}
                  onClick={() => router.push(`/${item?.type}/${item.id}`)}
                  name={item?.name}
                  imageSrc={item?.images[0]?.url}
                  imageAlt={item?.name + ' cover image'}
                  imageIcon='music'
                  imageClassName='w-full h-full'
                />
              ))}
            </>
          ) : (
            <>
              {Array(cardCount)
                .fill(0)
                .map((_, i) => (
                  <CardButtonSkeleton
                    key={i}
                    imageClassName='w-full h-full'
                    dir='row'
                  />
                ))}
            </>
          )}
        </CardSectionItems>
      </CardSection>
    )
  }
)

HomeSection.displayName = 'HomeSection'

export { HomeSection }
