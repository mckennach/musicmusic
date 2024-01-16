import { Button } from '@/components/ui/button'
import { useSpotify } from '@/hooks'
import { isPlayingAtom, sessionAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
import { Pause, Play } from 'lucide-react'
import React from 'react'
interface PlayPauseProps extends React.HTMLAttributes<HTMLDivElement> {}

const PlayPauseButton = React.forwardRef<HTMLButtonElement, PlayPauseProps>(
  ({ className, ...props }, ref) => {
    const spotify = useSpotify();
    const [session] = useAtom(sessionAtom);
    const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom)

    const handlePlayPause = async () => {
      if (isPlaying) {
        await spotify.pause()
      } else {
        await spotify.play()
      }
      setIsPlaying(!isPlaying)
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
