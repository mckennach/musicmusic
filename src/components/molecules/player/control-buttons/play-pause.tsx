import React, { useState } from 'react'

import { useAtom } from 'jotai'

import { Button } from '@/components/ui/button'
import { activeDeviceAtom, isPlayingAtom, playbackStateAtom } from '@/lib/atoms'
import spotify from '@/lib/spotify-sdk'
import { Pause, Play } from 'lucide-react'
import { useSession } from 'next-auth/react'

interface PlayPauseProps extends React.HTMLAttributes<HTMLDivElement> {}

const PlayPauseButton = React.forwardRef<HTMLButtonElement, PlayPauseProps>(
  ({ className, ...props }, ref) => {
    const { data: session } = useSession()

    const [playbackState, setPlaybackState] = useAtom(playbackStateAtom)
    const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom)
    const [activeDevice] = useAtom(activeDeviceAtom)
    const [isPlayingState, setIsPlayingState] = useState(false)
    const handlePlayPause = async () => {
      if (activeDevice && activeDevice?.id && session) {
        console.log(activeDevice)
        console.log(isPlaying)
        if (!playbackState?.is_playing) {
          spotify.player?.startResumePlayback(activeDevice?.id).then(() => {
            spotify.player.getPlaybackState().then((state) => {
              setIsPlaying(state?.is_playing)
              setPlaybackState(state)
            })
          })
        } else {
          spotify.player?.pausePlayback(activeDevice?.id).then(() => {
            spotify.player.getPlaybackState().then((state) => {
              setIsPlaying(state?.is_playing)
              setPlaybackState(state)
            })
          })
        }
      }
    }

    // useEffect(() => {
    //   spotify.player.getPlaybackState().then((state) => {
    //     if (state) {
    //       setIsPlayingState(state.is_playing);
    //       setPlaybackState(state);
    //       setPlaybackState(state);
    //     }
    //   })
    // }, [isPlaying, isPlayingState, playbackState, setIsPlaying, setPlaybackState])

    return (
      <Button
        disabled={!session}
        size='icon'
        className='h-8 w-8 rounded-full'
        scale={true}
        onClick={handlePlayPause}
        ref={ref}
      >
        {playbackState && isPlaying && session ? (
          <Pause size={16} fill='black' />
        ) : (
          <Play size={16} fill='black' className='translate-x-[1px]' />
        )}
      </Button>
    )
  }
)

PlayPauseButton.displayName = 'PlayPauseButton'

export { PlayPauseButton }
