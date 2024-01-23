'use client'
import { useEffect, useState } from "react"
import { Playlist, User, Track } from "@spotify/web-api-ts-sdk"
import { Hero } from "../organisms/hero"
import spotify from '@/lib/spotify-sdk'
import { UserAvatar } from "../ui/user-avatar"
import Link from "next/link"
import { BackgroundFade } from "../ui/background-fade"
import { ControlBar } from "../organisms/control-bar"
import { TrackList } from "../organisms/track-list"
import { Clock } from "lucide-react"
import { TrackListHeaderItems } from "../organisms/track-list"
// import { useImageData } from "@/hooks/useImageData"
const headerItems: TrackListHeaderItems[] = [
  {
    title: '#',
    value: 'index',
    className: 'w-6',
  },
  {
    title: 'Title',
    value: 'title',
  },
  {
    title: 'Album',
    value: 'album',
  },
  {
    title: 'Date added',
    value: 'date',
  },
  {
    title: 'Length',
    value: 'length',
    icon: <Clock size={16} className='mr-8' />
  }
]

export default function Playlist({ id }: { id: string}) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [owner, setOwner] = useState<User | null>(null);
  const [tracks, setTracks] = useState<Playlist['tracks']['items']>([]);


  useEffect(() => {
    if(id) {
      spotify.playlists.getPlaylist(id).then((data) => {
        setPlaylist(data)
        const { owner } = data;
        setTracks(data.tracks.items)
        spotify.users.profile(owner.id).then((owner) => {
          setOwner(owner)
        })
      });
      
      
    }
  }, []);


  if(!playlist) return null;
  return (
    <div className='under-header'>
      <Hero
        title={playlist?.name}
        subtitle={playlist?.public ? 'Public Playlist' : 'Playlist'}
        description={playlist?.description}
        extraInfo={
          <>
            <UserAvatar
              src={owner?.images && owner?.images[0].url}
              alt={`${playlist?.owner?.display_name} avatar`}
              className='h-6 w-6'
              name={'User'}
              icon='user'
              size='md'
            />
            <span className='text-xs font-normal'>
              Created by{' '}
              <Link href={`/user/${playlist?.owner?.id}`}>
                <span className='font-medium'>
                  {playlist?.owner?.display_name}
                </span>
              </Link>{' '}
              · {playlist?.followers?.total} likes · {playlist?.tracks?.total}{' '}
              songs · {playlist?.public ? 'Public' : 'Private'} ·{' '}
              {playlist?.collaborative ? 'Collaborative' : 'Not Collaborative'}
            </span>
          </>        
        }
        imageSrc={playlist?.images && playlist?.images[0].url}
        imageIcon="music"
        imageSize="cover"
      />
      <section className='relative h-full content-spacing'>
        <BackgroundFade className='faade m-0 top-0 isolate' />
        <ControlBar id={id} />
        <TrackList 
          id={id}
          contextUri={playlist?.uri}
          tracks={tracks} 
          columnCount={5} 
          type="playlist" 
          headerItems={headerItems} />
      </section>
    </div>
  )
}