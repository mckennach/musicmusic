import {
  nowPlayingViewAtom,
  playbackStateAtom,
  sideBarRightActiveAtom
} from '@/lib/atoms'
import { Track } from '@spotify/web-api-ts-sdk'
import { useAtom } from 'jotai'
import { X } from 'lucide-react'
import Link from 'next/link'
import { forwardRef } from 'react'
interface HeadingProps {
  // Props for your component
}

const Heading = forwardRef<HTMLDivElement, HeadingProps>(
  ({ ...props }, ref) => {
    const [playbackState] = useAtom(playbackStateAtom)
    const [nowPlayingView, setNowPlayingView] = useAtom(nowPlayingViewAtom)
    const [sideBarRightActive, setSideBarRightActive] = useAtom(
      sideBarRightActiveAtom
    )

    const handleButtonClick = () => {
      setNowPlayingView(false)
      setSideBarRightActive(false)
    }

    return (
      <header ref={ref} className='flex items-center relative max-w-full'>
        <div className='max-w-[90%] overflow-hidden'>
          <Link
            href={`/album/${(playbackState?.item as Track).album.id}`}
            className='truncate font-semibold'
          >
            {(playbackState?.item as Track).album.name}
          </Link>
        </div>
        <button onClick={handleButtonClick} className='max-w-[10%]'>
          <X size={16} strokeWidth={1} />
        </button>
      </header>
    )
  }
)

Heading.displayName = 'Heading'

export { Heading }
