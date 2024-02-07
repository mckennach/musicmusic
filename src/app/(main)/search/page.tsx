import type { Metadata } from 'next'

import { SearchBrowse } from '@/components/organisms/search/browse-section'
import { SearchRecentSearches } from '@/components/organisms/search/recent-searches'
import { authOptions } from '@/lib/auth/auth-options'
import { AuthSession } from '@/types/database.ds'
import { getServerSession } from 'next-auth'

export const metadata: Metadata = {
  title: 'Search | Spotify',
  description:
    'Spotify is a digital music service that gives you access to millions of songs.'
}

export default async function Search() {
  const session: AuthSession | null = await getServerSession(authOptions)
  return (
    <div className='flex flex-col px-4 pb-12'>
      <div className='flex flex-col isolate pt-2 bg-transparent'>
        <div className='flex flex-wrap gap-8'>
          <SearchRecentSearches session={session} />
          <SearchBrowse session={session} />
        </div>
      </div>
    </div>
  )
  // return <SearchPage />
}
