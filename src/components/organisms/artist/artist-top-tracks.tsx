'use client'
import { Button } from '@/components/ui/button'
import { fetchArtistTopTracks } from '@/services/server/queries'
import { AuthSession } from '@/types/database.ds'
import { Artist, TopTracksResult } from '@spotify/web-api-ts-sdk'
import { useEffect, useState } from 'react'
// import { useEffect, useState } from 'react'
// import { TrackList } from '../track-list'
import { TrackList } from '@/components/molecules/tracks/track-list'
// spotifySdk.artists.topTracks()
export function ArtistTopTracks({
  session,
  artist,
  id
}: {
  session: AuthSession | null
  artist: Artist | null
  id: string
}) {
  const [showAll, setShowAll] = useState<boolean>(false)
  const [topTracks, setTopTracks] = useState<TopTracksResult | null>(null)

  useEffect(() => {
    ;(async () => {
      if (!session || !id) return
      const tracks = await fetchArtistTopTracks(id, session)
      setTopTracks(tracks)
    })()
  }, [session, id])

  if (!artist || !topTracks) return null
  return (
    <section className='artist-top-items__tracks'>
      <TrackList
        id={id}
        contextUri={artist.uri}
        tracks={showAll ? topTracks.tracks : topTracks.tracks.slice(0, 5) || []}
        columnCount={4}
        type='top-tracks'
      />
      <div>
        <Button
          variant='link'
          onClick={() => setShowAll(!showAll)}
          className='mt-4 p-4  text-[hsla(0,0%,100%,.7)] hover:text-[hsla(0,0%,100%,1)] hover:no-underline font-bold text-xs leading-normal'
        >
          <div>{showAll ? 'Show less' : 'See more'}</div>
        </Button>
      </div>
    </section>
  )
}
