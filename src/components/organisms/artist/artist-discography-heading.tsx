'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
// import { ArtistDiscographyHeading } from '@/components/organisms/artist/artist-discography-heading';
import { Page, SimplifiedAlbum } from '@spotify/web-api-ts-sdk'
interface FilterProps {
  label: string
  value: string
}

export interface ArtistDiscographyHeadingProps
  extends React.HTMLAttributes<HTMLDivElement> {
  data: Page<SimplifiedAlbum>
}

const ArtistDiscographyHeading = React.forwardRef<
  HTMLDivElement,
  ArtistDiscographyHeadingProps
>(({ data, ...props }, ref) => {
  const [filteredData, setFilteredData] = useState<SimplifiedAlbum[]>([])
  const [selectedType, setSelectedType] = useState<string>('popular-releases')
  const [types, setTypes] = useState<FilterProps[]>([
    {
      label: 'Popular releases',
      value: 'popular-releases'
    },
    {
      label: 'Albums',
      value: 'album'
    },
    {
      label: 'Singles & EPs',
      value: 'single'
    },
    {
      label: 'Compilations',
      value: 'compilation'
    }
  ])

  useEffect(() => {
    if (!data || !data.items || selectedType === 'popular-releases') return
    data.items.filter((item) => {
      if (item.album_group === selectedType) {
        setFilteredData((prev) => [...prev, item])
      }
    })
  }, [data, selectedType])

  const handleFilter = (type: FilterProps) => {
    setSelectedType(type.value)
  }
  return (
    <div className='flex gap-2 mt-4 overflow-hidden' ref={ref}>
      {types.map((type, index) => (
        <Button
          key={index}
          className={cn(
            `h-8 !w-max rounded-full  text-xs font-semibold  text-foreground`,
            `bg-tinted-base hover:bg-tinted-higlight active:bg-tinted-press`,
            selectedType === type.value &&
              `bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary-press capitalize`
          )}
          size='sm'
          onClick={() => handleFilter(type)}
        >
          {type.label}
        </Button>
      ))}
    </div>
  )
})

ArtistDiscographyHeading.displayName = 'ArtistDiscographyHeading'

export { ArtistDiscographyHeading }
