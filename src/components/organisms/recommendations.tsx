'use client'

import {
  Playlist,
  RecommendationsResponse,
  Track
} from '@spotify/web-api-ts-sdk'

import { useEffect, useState } from 'react'

import spotify from '@/lib/spotify-sdk'

import { TrackList } from '../organisms/track-list'
import { Button } from '../ui/button'

import { AuthSession } from '@/types/database.ds'

export function Recommendations({
  playlist,
  title = 'Recommended',
  description,
  session,
  recommendations
}: {
  playlist?: Playlist
  title?: string
  description?: string
  session: AuthSession | null
  recommendations: RecommendationsResponse | null
}) {
  const [tracks, setTracks] = useState<Track[] | null>(null)
  useEffect(() => {
    if (!recommendations) return
    setTracks(recommendations.tracks)
  }, [recommendations])

  const handleRefresh = () => {
    if (!session || !playlist) return
    spotify.recommendations
      .get({
        limit: 10,
        seed_tracks: playlist?.tracks?.items
          .slice(0, 5)
          .map((item) => item.track.id)
      })
      .then((data) => {
        setTracks(data?.tracks)
      })
  }

  if (!tracks || !playlist) return null
  return (
    <div className='content-spacing'>
      <div className='pb-4 pt-6 flex justify-end'>
        <Button variant='link'>Find more</Button>
      </div>
      <div className='flex flex-col gap-4'>
        <div>
          <h2 className='text-white font-bold text-3xl'>{title}</h2>
          <p className='text-subdued'>{description}</p>
        </div>
        <TrackList
          id={playlist?.id}
          contextUri={playlist?.uri}
          tracks={tracks || []}
          columnCount={4}
          type='recommendations'
        />
        <div className='flex pt-4 justify-end'>
          <Button variant='link' onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
      </div>
    </div>
  )
}
