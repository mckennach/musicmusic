'use server'

import { CardSection } from '@/components/molecules/cards/card-sections'
import { fetchUsersTopItems } from '@/services/server/queries/users.queries'
import { AuthSession } from '@/types/database.ds'
import { TopItems } from './top-items'
export async function HomeTopItems({
  session
}: {
  session: AuthSession | null
}) {
  const topItems = session
    ? await fetchUsersTopItems(session, 'artists', 'short_term', 6, 0)
    : null
  const curHr = new Date().getHours()
  const greeting =
    curHr < 12 ? 'Good Morning' : curHr < 18 ? 'Good Afternoon' : 'Good Evening'
  return (
    <CardSection
      heading={<h2 className='text-white font-bold text-3xl'>{greeting}</h2>}
      dir='row'
      className=''
    >
      {session && topItems && topItems.items.length > 0 ? (
        <TopItems topItems={topItems} />
      ) : (
        <p>Please login to see your top artists and tracks</p>
      )}
    </CardSection>
  )
}
