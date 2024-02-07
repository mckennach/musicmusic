'use client'

// Components
import { Episode, Track } from '@spotify/web-api-ts-sdk'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import { useAtom } from 'jotai'

// Hooks
// import { useSpotify } from '@/hooks'
import { playbackStateAtom, sessionAtom } from '@/lib/atoms'

import { NowPlayingLoading } from '@/components/molecules/player/now-playing/loading'
import { CoverImage } from '@/components/ui/cover-image'
// Utils
import { ItemTitle } from '@/components/ui/item-title'

interface NowPlayingProps extends React.HTMLAttributes<HTMLDivElement> {}

const NowPlaying = React.forwardRef<HTMLDivElement, NowPlayingProps>(
  ({ ...props }, ref) => {
    // const spotify = useSpotify()
    const [session] = useAtom(sessionAtom)
    const [playbackState] = useAtom(playbackStateAtom)
    const [isArtist, setIsArtist] = useState(false)
    const [title, setTitle] = useState<string | undefined>(undefined)
    const [subtitle, setSubtitle] = useState<string | undefined>(undefined)
    const [image, setImage] = useState<string | undefined>(undefined)
    const [alt, setAlt] = useState<string>('Cover')
    const [playingTrack, setPlayingTrack] = useState<Track | undefined>(
      undefined
    )
    const [playingEpisode, setPlayingEpisode] = useState<Episode | undefined>(
      undefined
    )

    useEffect(() => {
      if (playbackState) {
        if (playbackState.item) {
          if (playbackState.item && playbackState.item?.type === 'track') {
            const item = playbackState.item as Track
            setPlayingTrack(item)
          } else {
            const item = playbackState.item as Episode
            setPlayingEpisode(item)
          }
        }
      }
    }, [playbackState])

    return (
      <div ref={ref} {...props}>
        {session && playbackState ? (
          <div className='flex w-full items-center justify-start'>
            <div className='flex max-w-full items-center gap-x-3 gap-y-2 truncate'>
              <CoverImage
                src={
                  playingEpisode?.show.images[0].url ||
                  playingTrack?.album.images[0].url
                }
                alt={alt}
                icon='music'
              />
              <ItemTitle
                title={
                  <Link
                    href={
                      playingTrack
                        ? `/album/${playingTrack?.album.id}`
                        : `/episode/${playingEpisode?.id}`
                    }
                    className='truncate text-sm font-normal text-foreground hover:underline'
                  >
                    {playingTrack?.name || playingEpisode?.name}
                  </Link>
                }
                label={
                  playingTrack ? (
                    <>
                      {playingTrack.artists.map((artist, index) => {
                        return (
                          <Link
                            href={`/artist/${artist?.id}`}
                            key={artist.id}
                            className='hover:underline text-xs truncate'
                          >
                            {artist.name}
                            {index < playingTrack.artists.length - 1 && ', '}
                          </Link>
                        )
                      })}
                    </>
                  ) : (
                    <Link
                      href={`/show/${playingEpisode?.show?.id}`}
                      className='hover:underline text-xs'
                    >
                      {playingEpisode?.show.name}
                    </Link>
                  )
                }
              />
            </div>
          </div>
        ) : (
          <NowPlayingLoading />
        )}
      </div>
    )
  }
)

NowPlaying.displayName = 'NowPlaying'

export { NowPlaying }
