import {
  ArtistDiscography,
  ArtistTopTracks
} from '@/components/organisms/artist'
import { ControlBar } from '@/components/organisms/control-bar'
import { Hero } from '@/components/organisms/hero'
import { BackgroundFade } from '@/components/ui/background-fade'
import { ArtistProvider } from '@/context/artist'
import { authOptions } from '@/lib/auth/auth-options'
import { formatNumber } from '@/lib/utils'
import {
  getArtist,
  getArtistTopTracks,
  getArtistsDiscography
} from '@/services/server/queries/artists.queries'
import { AuthSession } from '@/types/database.ds'
import {
  Artist,
  Page,
  SimplifiedAlbum,
  TopTracksResult
} from '@spotify/web-api-ts-sdk'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'

const fetchTopTracks = async (id: string, session: AuthSession | null) => {
  'use server'
  const topTracks: TopTracksResult = session
    ? await getArtistTopTracks(id, session)
    : null
  return topTracks
}

const fetchDiscography = async (id: string, session: AuthSession | null) => {
  'use server'
  const discog: Page<SimplifiedAlbum> = session
    ? await getArtistsDiscography(id, session)
    : null
  return discog
}

export default async function Artist({ params }: { params: { id: string } }) {
  const session: AuthSession | null = await getServerSession(authOptions)
  const artist: Artist | null = session
    ? await getArtist(params.id, session)
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
        <section className='relative h-full bg-card isolate space-y-6 min-h-28'>
          <BackgroundFade className='faade m-0 top-0 isolate animate-fade-in' />
          <Suspense fallback={<p>Loading Control bar...</p>}>
            <ControlBar id={params.id} />
          </Suspense>
          <Suspense fallback={<p>Loading Top Songs...</p>}>
            <ArtistTopTracks
              session={session}
              artist={artist}
              id={params.id}
              fetchTopTracks={fetchTopTracks}
            />
          </Suspense>
          <Suspense fallback={<p>Loading Top Songs...</p>}>
            <ArtistDiscography
              session={session}
              artist={artist}
              id={params.id}
              fetchDiscography={fetchDiscography}
            />
          </Suspense>
        </section>
      </div>
    </ArtistProvider>
  )
}
