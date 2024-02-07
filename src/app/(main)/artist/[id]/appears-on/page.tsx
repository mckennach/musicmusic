import { CardButtonVertical } from '@/components/molecules/cards/card-button'
import { CardSection } from '@/components/molecules/cards/card-sections'
import { SectionContainer } from '@/components/templates/section-container'
import { authOptions } from '@/lib/auth/auth-options'
import { fetchMyItems } from '@/services/server/queries'
import { AuthSession } from '@/types/database.ds'
import { Page, SimplifiedAlbum } from '@spotify/web-api-ts-sdk'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
export default async function ArtistAppearsOn({
  params
}: {
  params: { id: string; slug: string }
}) {
  const session: AuthSession | null = await getServerSession(authOptions)
  const related = session
    ? await fetchMyItems(
        session,
        ['discography'],
        `spotify/artist/${params.id}/albums`,
        50,
        0,
        {
          includeGroups: 'appears_on'
        }
      )
    : null
  const albums = related
    ? (related['discography'] as Page<SimplifiedAlbum>).items
    : null

  return (
    <SectionContainer className='content-spacing display-all' id='discography'>
      <Suspense fallback={<p>Loading Top Songs...</p>}>
        <CardSection
          heading={<h2 className='text-2xl font-semibold'>Appears on</h2>}
          dir='column'
          className=''
        >
          {
            <>
              {albums &&
                albums.map((item, i) => (
                  <CardButtonVertical
                    // onClick={() => router.push(`/artist/${item.id}`)}
                    className='card-section__item'
                    key={i}
                    imageSrc={item.images[0]?.url}
                    imageAlt={item.name + ' cover image'}
                    imageClassName='rounded-full'
                    title={item.name}
                    label={'Artist'}
                    showPlayButton={true}
                  />
                ))}
            </>
          }
        </CardSection>
      </Suspense>
    </SectionContainer>
  )
}
