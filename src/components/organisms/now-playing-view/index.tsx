import { Heading } from '@/components/molecules/now-playing-view/heading'
import { playbackStateAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
import { forwardRef, Ref } from 'react'

interface NowPlayingSideBarViewProps {
  // Props for your component
}

const NowPlayingSideBarView = forwardRef(
  (props: NowPlayingSideBarViewProps, ref: Ref<HTMLDivElement>) => {
    const [playbackState, setPlaybackState] = useAtom(playbackStateAtom)
    // const [nowPlaying, setNowPlaying] = useAtom(nowPlayingItem);
    // useEffect(() => {
    //   spotifySdk.player.getPlaybackState().then((state: PlaybackState) => {
    //     setPlaybackState(state);

    //   });
    //    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // useEffect(() => {
    //   if (playbackState?.item) {
    //     setNowPlaying(playbackState.item);
    //   }
    // }, [playbackState, setNowPlaying]);

    return (
      <div className='max-w-full flex py-2' ref={ref}>
        <Heading />
      </div>
    )
  }
)

NowPlayingSideBarView.displayName = 'NowPlayingSideBarView'

export { NowPlayingSideBarView }
