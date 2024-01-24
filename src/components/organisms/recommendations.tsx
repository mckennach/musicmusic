'use client'

import {
  Page,
  Playlist,
  PlaylistedTrack,
  QueryAdditionalTypes,
  Track,
  TrackItem
} from '@spotify/web-api-ts-sdk'
import { useState, useEffect } from 'react'
import { getRecommendations } from '@/services/server/queries'
// import React, { useEffect, useState } from 'react'

import spotify from '@/lib/spotify-sdk'
import { useAtom } from 'jotai'
import { sessionAtom } from '@/lib/atoms'
import { TrackList, TrackListHeaderItems } from '../organisms/track-list'
import { Button } from '../ui/button';
import { AuthSession } from '@/types/database.ds';

export function Recommendations({
  playlist,
  title = 'Recommended',
  description,
  recommendedTracks
}: {
  playlist?: Playlist
  title?: string
  description?: string
  recommendedTracks?: Track[]
}) {
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [session] = useAtom(sessionAtom);


  useEffect(() => {
    if(!recommendedTracks) return;
    setTracks(recommendedTracks);
  }, [recommendedTracks]);

  const handleRefresh = async () => {
    if (!session) return null
    spotify.recommendations.get({
      limit: 10,
      seed_tracks: playlist?.tracks?.items
      .slice(0, 5)
      .map((item) => item.track.id)
    }).then((res) => {
      setTracks(res.tracks)
    })
  }

  if (!tracks || !playlist) return null
  return (
    <div>
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
