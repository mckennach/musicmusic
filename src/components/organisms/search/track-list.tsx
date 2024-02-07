'use client'

import { CardSection, CardSectionHeading } from '@/components/ui/card-section'
import { cn } from '@/lib/utils'
import { ItemTypes, SearchResults } from '@spotify/web-api-ts-sdk'
import { TrackList } from '../track-list'
interface SearchTrackListProps {
  results: SearchResults<ItemTypes[]>
  query: string
  className?: string
}

export function SearchTrackList({
  results,
  query,
  className
}: SearchTrackListProps) {
  return (
    <div className={cn('', className)}>
      <CardSection>
        <CardSectionHeading>
          <h2 className='text-white font-bold text-2xl'>Songs</h2>
        </CardSectionHeading>
      </CardSection>
      {results && results?.tracks && results?.tracks?.items?.length > 0 ? (
        <ul className='flex flex-col gap-1'>
          <TrackList
            id={results?.tracks?.items[0]?.id || ''}
            contextUri={results?.tracks?.items[0]?.uri || ''}
            tracks={results?.tracks?.items?.slice(0, 4) || []}
            columnCount={2}
            type='search'
          />
        </ul>
      ) : (
        <></>
      )}
    </div>
  )
}
