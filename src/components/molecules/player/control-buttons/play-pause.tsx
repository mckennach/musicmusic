import React from 'react'

import { useAtom } from 'jotai'

import { activeDeviceAtom, isPlayingAtom, sessionAtom } from '@/lib/atoms'
import spotify from '@/lib/spotify-sdk'

import { Pause, Play } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface PlayPauseProps extends React.HTMLAttributes<HTMLDivElement> {}

const PlayPauseButton = React.forwardRef<HTMLButtonElement, PlayPauseProps>(
  ({ className, ...props }, ref) => {
    const [session] = useAtom(sessionAtom)
    const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom)
    const [activeDevice] = useAtom(activeDeviceAtom)
    const handlePlayPause = async () => {
      if (activeDevice && activeDevice?.id) {
        if (!isPlaying) {
          spotify.player?.startResumePlayback(activeDevice?.id).then(() => {
            setIsPlaying(true)
          })
        } else {
          spotify.player?.pausePlayback(activeDevice?.id).then(() => {
            setIsPlaying(false)
          })
        }

        // await startResumePlayback(activeDevice?.id, contextUri, undefined, index, 0);
        // getPlaybackState().then((playbackState) => {
        //   setPlaybackState(playbackState);
        //   setActivePlaylist(contextUri);
        // });
      }
      // if (isPlaying) {
      //   await spotify.player?.pausePlayback()
      // } else {
      //   await spotify.player?.resumePlayback();
      // }
      // setIsPlaying(!isPlaying)
    }

    return (
      <Button
        disabled={!session}
        size='icon'
        className='h-8 w-8 rounded-full'
        scale={true}
        onClick={handlePlayPause}
        ref={ref}
      >
        {isPlaying && session ? (
          <Pause size={16} fill='black' />
        ) : (
          <Play size={16} fill='black' />
        )}
      </Button>
    )
  }
)

PlayPauseButton.displayName = 'PlayPauseButton'

export { PlayPauseButton }
