import { CardButtonVertical } from '@/components/molecules/cards/card-button'
import { CardSection } from '@/components/molecules/cards/card-sections'
import { SectionContainer } from '@/components/templates/section-container'
import { authOptions } from '@/lib/auth/auth-options'
import { fetchMyItems } from '@/services/server/queries'
import { AuthSession } from '@/types/database.ds'
import {
  Artist,
  Page,
  RecentlyPlayedTracksPage,
  SavedAlbum,
  SimplifiedPlaylist
} from '@spotify/web-api-ts-sdk'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
export default async function ArtistAppearsOn({
  params
}: {
  params: { id: string; slug: string }
}) {
  if (!params.id || !params.slug) return null

  if (params.slug === 'recently-played') {
    const session: AuthSession | null = await getServerSession(authOptions)
    const recentlyPlayed =
      session && params.slug
        ? await fetchMyItems(
            session,
            [params.slug],
            `spotify/me/2/player/recently-played?limit=50&offset=0`,
            50,
            0,
            {}
          )
        : null
    const tracks = recentlyPlayed
      ? (recentlyPlayed[params.slug] as RecentlyPlayedTracksPage).items
      : null

    return (
      <SectionContainer
        className='content-spacing display-all'
        id='discography'
      >
        <Suspense fallback={<p>Loading Top Songs...</p>}>
          <CardSection
            heading={
              <h2 className='text-2xl font-semibold'>Recently Played</h2>
            }
            dir='column'
            className=''
          >
            {
              <>
                {tracks &&
                  tracks.map((item, i) => (
                    <CardButtonVertical
                      // onClick={() => router.push(`/artist/${item.id}`)}
                      className='card-section__item'
                      key={i}
                      imageSrc={item.track.album.images[0]?.url}
                      imageAlt={item.track.name + ' cover image'}
                      imageClassName=''
                      title={item.track.name}
                      label={item.track.artists
                        .map((artist, i) => artist.name)
                        .join(', ')}
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

  if (params.slug === 'artists') {
    const session: AuthSession | null = await getServerSession(authOptions)
    const recentlyPlayed =
      session && params.slug
        ? await fetchMyItems(
            session,
            ['top-artists'],
            `spotify/me/2/top/artists?limit=50&offset=0&time_range=long_term`,
            50,
            0,
            {}
          )
        : null
    const tracks = recentlyPlayed
      ? (recentlyPlayed['top-artists'] as Page<Artist>).items
      : null

    return (
      <SectionContainer
        className='content-spacing display-all'
        id='discography'
      >
        <Suspense fallback={<p>Loading Top Songs...</p>}>
          <CardSection
            heading={
              <h2 className='text-2xl font-semibold'>Recently Played</h2>
            }
            dir='column'
            className=''
          >
            {
              <>
                {tracks &&
                  tracks.map((item, i) => (
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

  if (params.slug === 'albums') {
    const session: AuthSession | null = await getServerSession(authOptions)
    const recentlyPlayed =
      session && params.slug
        ? await fetchMyItems(
            session,
            ['albums'],
            `spotify/me/2/albums?limit=50&offset=0`,
            50,
            0,
            {}
          )
        : null
    const tracks = recentlyPlayed
      ? (recentlyPlayed['albums'] as Page<SavedAlbum>).items
      : null

    return (
      <SectionContainer
        className='content-spacing display-all'
        id='discography'
      >
        <Suspense fallback={<p>Loading Top Songs...</p>}>
          <CardSection
            heading={
              <h2 className='text-2xl font-semibold'>Recently Played</h2>
            }
            dir='column'
            className=''
          >
            {
              <>
                {tracks &&
                  tracks.map((item, i) => (
                    <CardButtonVertical
                      // onClick={() => router.push(`/artist/${item.id}`)}
                      className='card-section__item'
                      key={i}
                      imageSrc={item.album.images[0]?.url}
                      imageAlt={item.album.name + ' cover image'}
                      imageClassName='rounded-full'
                      title={item.album.name}
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

  if (params.slug === 'playlists') {
    const session: AuthSession | null = await getServerSession(authOptions)
    const recentlyPlayed =
      session && params.slug
        ? await fetchMyItems(
            session,
            ['playlists'],
            `spotify/me/2/playlists?limit=50&offset=0`,
            50,
            0,
            {}
          )
        : null
    const tracks = recentlyPlayed
      ? (recentlyPlayed['playlists'] as Page<SimplifiedPlaylist>).items
      : null

    return (
      <SectionContainer
        className='content-spacing display-all'
        id='discography'
      >
        <Suspense fallback={<p>Loading Top Songs...</p>}>
          <CardSection
            heading={
              <h2 className='text-2xl font-semibold'>Recently Played</h2>
            }
            dir='column'
            className=''
          >
            {
              <>
                {tracks &&
                  tracks.map((item, i) => (
                    <CardButtonVertical
                      // onClick={() => router.push(`/artist/${item.id}`)}
                      className='card-section__item'
                      key={i}
                      imageSrc={item.images[0]?.url}
                      imageAlt={item.name + ' cover image'}
                      imageClassName=''
                      title={item.name}
                      label={`By ${item.owner.display_name}`}
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
}
