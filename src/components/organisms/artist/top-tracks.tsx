'use client'
import { Button } from '@/components/ui/button'
import { AuthSession } from '@/types/database.ds'
import { Artist, TopTracksResult } from '@spotify/web-api-ts-sdk'
import { useEffect, useState } from 'react'
import { TrackList } from '../track-list'

export function ArtistTopTracks({
  session,
  artist,
  id,
  fetchTopTracks
}: {
  session: AuthSession | null
  artist: Artist | null
  id: string
  fetchTopTracks: (
    id: string,
    session: AuthSession | null
  ) => Promise<TopTracksResult>
}) {
  const [showAll, setShowAll] = useState<boolean>(false)
  const [topTracks, setTopTracks] = useState<TopTracksResult | null>(null)

  useEffect(() => {
    if (!artist) return
    fetchTopTracks(id, session).then((result) => {
      setTopTracks(result)
    })
  }, [artist, id, session])

  if (!artist || !topTracks) return null
  return (
    <section className='relative' role='presentation'>
      <div className='content-spacing space-y-4'>
        <h2 className='text-2xl text-white font-bold'>Popular</h2>
        {topTracks && (
          <TrackList
            id={artist?.id}
            contextUri={artist?.uri}
            tracks={
              showAll ? topTracks.tracks : topTracks.tracks.slice(0, 5) || []
            }
            columnCount={5}
            type='artist'
          />
        )}
        <div>
          <Button variant='link' onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show less' : 'Show all'}
          </Button>
        </div>
      </div>
    </section>
  )
}
