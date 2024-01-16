import { cn } from '@/lib/utils'
import React from 'react'
import { NowPlaying } from './now-playing'
import { PlayerControls } from './player-controls'
import { PlayerSettings } from './player-settings'

interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Player = React.forwardRef<HTMLDivElement, PlayerProps>(
  ({ className, ...props }, ref) => {
    // const [, setAsyncPlayback] = useAtom(asyncPlaybackAtom);
    // const [playbackState, setPlaybackState] = useAtom(playbackStateAtom);

    // useEffect(() => {
    //   (async () => {
    //     if(playbackState) {
    //       setAsyncPlayback();
    //     }
    //   })();
    // }, []);

    return (
      <footer className={cn(`flex`, className)} {...props} ref={ref}>
        <div className='flex h-full w-full items-center justify-between'>
          <NowPlaying className={cn('flex-1 basis-[30%] max-w-[30%] pl-2')} />
          <PlayerControls className={cn('flex-1 basis-[40%] max-w-[40%]')} />
          <PlayerSettings className={cn('flex-1 basis-[30%] max-w-[30%]')} />
        </div>
      </footer>
    )
  }
)

Player.displayName = 'Player'

export { Player }
