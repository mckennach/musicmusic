import type { Metadata, ResolvingMetadata } from 'next'

import { AlbumControlBar } from '@/components/organisms/album/album-control-bar'
import { AlbumHero } from '@/components/organisms/album/album-hero'
import { AlbumTrackList } from '@/components/organisms/album/album-track-list'
import { SectionContainer } from '@/components/templates/section-container'
import { BackgroundFade } from '@/components/ui/background-fade'
import { authOptions } from '@/lib/auth/auth-options'
import { fetchArtist } from '@/services/server/queries'
import { getAlbum } from '@/services/server/queries/albums.queries'
import { AuthSession } from '@/types/database.ds'
import { Album, Artist } from '@spotify/web-api-ts-sdk'
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
  const album: Album | null = session
    ? await getAlbum(params.id, session)
    : null

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: album ? `${album.name} | Spotify` : 'Album | Spotify',
    openGraph: {
      images: [album ? album.images[0].url : '', ...previousImages]
    }
  }
}

export default async function AlbumPage({
  params
}: {
  params: { id: string }
}) {
  const session: AuthSession | null = await getServerSession(authOptions)
  const album: Album | null = session
    ? await getAlbum(params.id, session as AuthSession)
    : null
  const artist: Artist | null = album
    ? await fetchArtist(album.artists[0].id, session as AuthSession)
    : null

  if (!album || !session) return null
  return (
    <div className='under-header'>
      <Suspense fallback={<p>Loading hero...</p>}>
        <AlbumHero session={session} album={album} artist={artist} />
      </Suspense>
      <SectionContainer>
        <BackgroundFade className='faade m-0 top-0 isolate animate-fade-in' />
        <AlbumControlBar id={params.id} album={album} />

        <Suspense fallback={<p>Loading tracklist...</p>}>
          <AlbumTrackList id={params.id} album={album} session={session} />
        </Suspense>
        {/* <div className='content-spacing'>
          <TrackList
            id={params.id}
            contextUri={album.uri}
            tracks={album.tracks || []}
            columnCount={5}
            type='album'
            headerItems={headerItems}
          />
        </div> */}
      </SectionContainer>
    </div>
  )
}
