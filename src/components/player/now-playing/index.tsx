import React, { useEffect, useState } from 'react'
// Hooks
import { useSpotify } from '@/hooks'
import { playbackStateAtom } from '@/lib/atoms'
import { Episode, Track } from '@spotify/web-api-ts-sdk'
import { useAtom } from 'jotai'
// Components
import { NowPlayingLoading } from '@/components/player/now-playing/loading'
import Icon from '@/components/ui/icon'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import Link from 'next/link'
// Utils
import { cn } from '@/lib/utils'

interface NowPlayingProps extends React.HTMLAttributes<HTMLDivElement> {}

const NowPlaying = React.forwardRef<HTMLDivElement, NowPlayingProps>(
  ({ ...props }, ref) => {
    const spotify = useSpotify()
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
          // setTitle(playbackState.item.name);

          if (playbackState.item && playbackState.item?.type === 'track') {
            const item = playbackState.item as Track
            setPlayingTrack(item)
            // setSubtitle(item.artists[0].name);
            // setImage(item.album.images[0].url);
          } else {
            const item = playbackState.item as Episode
            setPlayingEpisode(item)
            // setSubtitle(item.show.name);
            // setImage(item.show.images[0].url);
          }
        }
      }
    }, [playbackState])

    return (
      <div ref={ref} {...props}>
        {playbackState ? (
          <div className='flex w-full items-center justify-start'>
            <div className='flex max-w-full items-center gap-x-3 gap-y-2 truncate'>
              <Avatar className={cn('h-10 w-10 rounded-sm')}>
                <AvatarImage
                  className={cn('rounded-sm')}
                  src={
                    playingEpisode?.show.images[0].url ||
                    playingTrack?.album.images[0].url
                  }
                  alt={alt}
                />
                <AvatarFallback className={cn('rounded-sm')}>
                  <Icon name='music' size={20} className='shadow-sm' />
                </AvatarFallback>
              </Avatar>
              <div className='h-full max-w-full space-y-0.5 truncate text-left'>
                <Link
                  href={
                    playingTrack
                      ? `/track/${playingTrack?.id}`
                      : `/episode/${playingEpisode?.id}`
                  }
                  className='truncate text-sm font-normal text-foreground hover:underline'
                >
                  {playingTrack?.name || playingEpisode?.name}
                </Link>
                <span className='flex items-center gap-1 truncate text-xs font-normal text-subdued'>
                  {playingTrack ? (
                    <>
                      {playingTrack.artists.map((artist, index) => {
                        return (
                          <Link
                            href={`/artist/${artist?.id}`}
                            key={artist.id}
                            className='hover:underline'
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
                      className='hover:underline'
                    >
                      {playingEpisode?.show.name}
                    </Link>
                  )}
                </span>
              </div>
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
