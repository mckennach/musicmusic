import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth/auth-options'

import { SearchTopResult } from '@/components/organisms/search/top-result'
import { SearchTrackList } from '@/components/organisms/search/track-list'
import { SectionContainer } from '@/components/templates/section-container'
import { fetchSearchResults } from '@/services/server/queries/search.queries'
import { AuthSession } from '@/types/database.ds'
import type { ItemTypes, PartialSearchResult } from '@spotify/web-api-ts-sdk'
interface ResourceTypeToResultKey {
  album: 'albums'
  artist: 'artists'
  track: 'tracks'
  playlist: 'playlists'
  show: 'shows'
  episode: 'episodes'
  audiobook: 'audiobooks'
}

export type SearchResults<T extends readonly ItemTypes[]> =
  Pick<PartialSearchResult, ResourceTypeToResultKey[T[number]]> extends infer R
    ? number extends T['length']
      ? R
      : Required<R>
    : never

export default async function Search({
  params
}: {
  params: { query: string }
}) {
  const session: AuthSession | null = await getServerSession(authOptions)
  const searchResults: SearchResults<ItemTypes[]> = await fetchSearchResults(
    params?.query,
    session
  )
  if (!searchResults) return null
  return (
    <SectionContainer>
      <div className='content-spacing'>
        <div className='grid grid-cols-5 gap-8'>
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <SearchTopResult
            className='col-span-2'
            results={searchResults}
            query={params.query}
            session={session}
          />
          {/* </Suspense> */}
          {/* <Suspense fallback={<div>Loading...</div>}> */}
          <SearchTrackList
            className='col-span-3'
            results={searchResults}
            query={params.query}
          />
          {/* </Suspense> */}
        </div>
      </div>
    </SectionContainer>
  )
}
