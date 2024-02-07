'use client'
import { CardButtonRow } from '@/components/molecules/cards/card-button'
import { Artist, Page } from '@spotify/web-api-ts-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'
interface TopItemsProps extends React.HTMLAttributes<HTMLDivElement> {
  topItems: Page<Artist>
}

const TopItems = React.forwardRef<HTMLDivElement, TopItemsProps>(
  ({ topItems, ...props }, ref) => {
    const router = useRouter()
    return (
      <>
        {topItems?.items?.map((item, i) => (
          <CardButtonRow
            onClick={() => router.push(`/artist/${item.id}`)}
            className='card-section__item'
            key={i}
            imageSrc={item?.images[0]?.url}
            imageAlt={item?.name + ' cover image'}
            title={item?.name}
          />
        ))}
      </>
    )
  }
)

TopItems.displayName = 'TopItems'

export { TopItems }
