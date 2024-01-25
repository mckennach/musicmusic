import { MoreHorizontal, Shuffle } from 'lucide-react'
import { Button } from '../ui/button'
import { SpotifyPlayButton } from '../ui/spotify-play-button'
export function ControlBar({ id }: { id: string }) {
  return (
    <section className='host relative'>
      <div className='py-6 content-spacing flex flex-col items-start'>
        <div className='flex items-center w-full gap-1'>
          <SpotifyPlayButton />
          <Button
            className='rounded-full w-14 h-14 text-subdued hover:text-white'
            size='icon'
            variant='link'
            scale={true}
          >
            <Shuffle size={26} />
          </Button>
          <Button
            className='rounded-full bg-transparent border-subdued text-subdued hover:border-white text-white font-semibold'
            size='sm'
            variant='outline'
            scale={true}
          >
            Following
          </Button>
          <Button
            className='rounded-full w-14 h-14 text-subdued hover:text-white'
            size='icon'
            variant='link'
            scale={true}
          >
            <MoreHorizontal size={26} />
          </Button>
        </div>
      </div>
    </section>
  )
}
