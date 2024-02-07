import { CardButtonVertical } from '@/components/molecules/cards/card-button'
import { CardSection } from '@/components/molecules/cards/card-sections'
import { SectionContainer } from '@/components/templates/section-container'
import { authOptions } from '@/lib/auth/auth-options'
import { fetchMyItems } from '@/services/server/queries'
import { AuthSession } from '@/types/database.ds'
import { Artists } from '@spotify/web-api-ts-sdk'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
export default async function ArtistRelated({
  params
}: {
  params: { id: string; slug: string }
}) {
  const session: AuthSession | null = await getServerSession(authOptions)
  const related = session
    ? await fetchMyItems(
        session,
        ['related-artists'],
        `spotify/artist/${params.id}/related-artists`,
        50,
        0,
        {}
      )
    : null
  const artists = related
    ? (related['related-artists'] as Artists).artists
    : null

  return (
    <SectionContainer
      className='content-spacing display-all'
      id='Related-Artists'
    >
      <Suspense fallback={<p>Loading Top Songs...</p>}>
        <CardSection
          heading={<h2 className='text-2xl font-semibold'>Fans also like</h2>}
          dir='column'
          className=''
        >
          {
            <>
              {artists &&
                artists.map((item, i) => (
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
