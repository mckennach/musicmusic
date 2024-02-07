import { SearchBrowse } from '@/components/organisms/search/browse-section'
import { SearchRecentSearches } from '@/components/organisms/search/recent-searches'
import { authOptions } from '@/lib/auth/auth-options'
import { AuthSession } from '@/types/database.ds'
import { getServerSession } from 'next-auth'

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
