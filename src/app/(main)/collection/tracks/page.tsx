import { TracksHero } from '@/components/organisms/tracks/tracks-hero'
import { SectionContainer } from '@/components/templates/section-container'
import { BackgroundFade } from '@/components/ui/background-fade'
import { authOptions } from '@/lib/auth/auth-options'
import { fetchUsersTracks } from '@/services/server/queries'
import { AuthSession } from '@/types/database.ds'
import { Page, SavedTrack } from '@spotify/web-api-ts-sdk'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
export default async function TrackPage({
  params
}: {
  params: { id: string }
}) {
  const session: AuthSession | null = await getServerSession(authOptions)
  const tracks: Page<SavedTrack> | null = session
    ? await fetchUsersTracks(session, 50, 0)
    : null
  if (!tracks) return null
  return (
    <div className='under-header'>
      <Suspense fallback={<p>Loading hero...</p>}>
        <TracksHero session={session} tracks={tracks} />
        {/* <AlbumHero session={session} album={album} artist={artist} /> */}
      </Suspense>
      <SectionContainer>
        <BackgroundFade className='faade m-0 top-0 isolate animate-fade-in' />
        {/* <Suspense fallback={<p>Loading control bar...</p>}>
          <AlbumControlBar id={params.id} album={album} />
        </Suspense>
        <Suspense fallback={<p>Loading tracklist...</p>}>
          <AlbumTrackList id={params.id} album={album} session={session} />
        </Suspense> */}
      </SectionContainer>
    </div>
  )
}
