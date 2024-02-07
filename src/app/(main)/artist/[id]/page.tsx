import { ControlBar } from '@/components/molecules/control-bar'
import { ArtistTopTracks } from '@/components/organisms/artist'
import { Hero } from '@/components/organisms/hero'
import { ItemSection } from '@/components/organisms/items-section/section-container'
import { SectionContainer } from '@/components/templates/section-container'
import { BackgroundFade } from '@/components/ui/background-fade'
import { ArtistProvider } from '@/context/artist'
import { authOptions } from '@/lib/auth/auth-options'
import { formatNumber } from '@/lib/utils'
import { fetchArtist } from '@/services/server/queries/artists.queries'
import { AuthSession } from '@/types/database.ds'
import type { Artist } from '@spotify/web-api-ts-sdk'
import type { Metadata, ResolvingMetadata } from 'next'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const session: AuthSession | null = await getServerSession(authOptions)
  const artist: Artist | null = session
    ? await fetchArtist(params.id, session)
    : null

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: artist ? `${artist.name} | Spotify` : 'Artist | Spotify',
    openGraph: {
      images: [artist ? artist.images[0].url : '', ...previousImages]
    }
  }
}

export default async function Artist({ params }: { params: { id: string } }) {
  const session: AuthSession | null = await getServerSession(authOptions)
  const artist: Artist | null = session
    ? await fetchArtist(params.id, session)
    : null

  if (!artist) return null

  return (
    <ArtistProvider artist={artist}>
      <div className='under-header'>
        <Suspense fallback={<p>Loading hero...</p>}>
          <Hero
            title={artist?.name}
            subtitle='Verified Artist'
            subtitleIcon='badge-check'
            imageSize='background'
            extraInfo={
              <div className='flex items-center space-x-2'>
                <span className='text-sm font-medium'>
                  {formatNumber(artist?.followers.total)} followers
                </span>
              </div>
            }
          />
        </Suspense>
        <SectionContainer className=''>
          <BackgroundFade className='faade m-0 top-0 isolate animate-fade-in' />
          <Suspense fallback={<p>Loading Control bar...</p>}>
            <ControlBar id={params.id} />
          </Suspense>

          <div className='artist-top-items content-spacing'>
            <Suspense>
              <ArtistTopTracks
                session={session}
                artist={artist}
                id={params.id}
              />
            </Suspense>
          </div>
          <section className='isolate pt-2 flex flex-col' data-testid='artist'>
            <div className='content-spacing flex flex-wrap gap-6 pt-2'>
              <Suspense>
                <ItemSection
                  title='Discography'
                  session={session}
                  endpoint={`spotify/artist/${params.id}/albums`}
                  type={['discography']}
                  fields={{
                    includeGroups: 'album,single,compilation'
                  }}
                  headingUrl={`/artist/${params.id}/discography/all`}
                  showFilter={true}
                  limit={6}
                  offset={0}
                />
              </Suspense>
              <Suspense>
                <ItemSection
                  title='Fans also like'
                  session={session}
                  endpoint={`spotify/artist/${params.id}/related-artists`}
                  type={['related-artists']}
                  headingUrl={`/artist/${params.id}/related`}
                  limit={6}
                  offset={0}
                />
              </Suspense>
              <Suspense>
                <ItemSection
                  title='Appears On'
                  session={session}
                  endpoint={`spotify/artist/${params.id}/albums`}
                  type={['discography']}
                  headingUrl={`/artist/${params.id}/appears-on`}
                  fields={{
                    includeGroups: 'appears_on'
                  }}
                  limit={6}
                  offset={0}
                />
              </Suspense>
            </div>
          </section>
        </SectionContainer>
      </div>
    </ArtistProvider>
  )
}
