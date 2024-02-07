'use server'

import { CardSection } from '@/components/molecules/cards/card-sections'
import { fetchMyItems } from '@/services/server/queries'
import { AuthSession, MyItemsKeys } from '@/types/database.ds'
import { MaxInt } from '@spotify/web-api-ts-sdk'
import { SectionHeading } from './section-heading'
import { SectionItems } from './section-items'

export async function ItemSection({
  title,
  endpoint,
  id,
  fields,
  type,
  limit,
  offset,
  session,
  showFilter,
  headingUrl
}: {
  title: string
  endpoint: string
  id?: string
  fields?: { [key: string]: any }
  heading?: string | React.ReactNode
  type: readonly MyItemsKeys[]
  limit: MaxInt<50>
  offset?: number
  session: AuthSession | null
  showFilter?: boolean
  headingUrl?: string
}) {
  const myItems = session
    ? await fetchMyItems(session, type, endpoint, limit, offset, fields)
    : null

  return (
    <CardSection
      heading={
        <SectionHeading
          title={title}
          session={session as AuthSession}
          data={myItems}
          type={type}
          url={headingUrl}
          showFilter={showFilter}
          id={id as string}
        />
      }
      dir='column'
      className=''
    >
      {session && myItems ? (
        // <></>
        <SectionItems data={myItems} type={type} limit={limit} />
      ) : (
        <p>Loading...</p>
      )}
    </CardSection>
  )
}
