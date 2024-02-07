'use client'
import { Button } from '@/components/ui/button'
import { SpotifyPlayButton } from '@/components/ui/spotify-play-button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useSpotify } from '@/hooks'
// import spotifySdk from '@/lib/spotify-sdk'
import { cn } from '@/lib/utils'
import { Album } from '@spotify/web-api-ts-sdk'
import { CheckCircle2, MoreHorizontal, PlusCircle, Shuffle } from 'lucide-react'
import { startTransition, useEffect, useState } from 'react'

export async function AlbumControlBar({
  id,
  album
}: {
  id: string
  album: Album
}) {
  const { checkIfItemIsSaved, saveItem, removeItem, startResumePlayback } =
    useSpotify()
  const [isSaved, setIsSaved] = useState(false)
  const [isShuffled, setIsShuffled] = useState(false)
  const context = album.uri

  useEffect(() => {
    startTransition(() => {
      checkIfItemIsSaved(id, 'albums').then((res) => setIsSaved(res))
    })
  })

  const handleSaveItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isSaved: boolean
  ) => {
    startTransition(() => {
      if (isSaved) {
        removeItem(id, 'albums')
        setIsSaved(false)
      } else {
        saveItem(id, 'albums')
        setIsSaved(true)
      }
    })
  }

  return (
    <section className='host relative'>
      <div className='py-6 content-spacing flex flex-col items-start'>
        <div className='flex items-center w-full gap-1'>
          <SpotifyPlayButton />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className={cn(
                  'rounded-full w-14 h-14  hover:text-white',
                  isShuffled ? 'text-white' : 'text-subdued-foreground'
                )}
                size='icon'
                variant='link'
                scale={true}
              >
                <Shuffle size={28} />
              </Button>
            </TooltipTrigger>
            <TooltipContent dir='top'>
              {isShuffled
                ? `Enable shuffle for ${album.name}`
                : `Disable shuffle for ${album.name}`}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={(e) => handleSaveItem(e, isSaved)}
                className={cn(
                  'text-subdued-foreground hover:text-white hover:scale-105 opacity-100 transition-all duration-300'
                )}
              >
                {isSaved ? (
                  <CheckCircle2
                    size={28}
                    className='text-black fill-bright-accent'
                  />
                ) : (
                  <PlusCircle size={28} />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {isSaved ? 'Remove from your library' : 'Save to your library'}
            </TooltipContent>
          </Tooltip>
          <Button
            className='rounded-full w-14 h-14 text-subdued hover:text-white'
            size='icon'
            variant='link'
            scale={true}
          >
            <MoreHorizontal size={28} />
          </Button>
          <Button
            className='rounded-full w-14 h-14 text-subdued hover:text-white'
            size='icon'
            variant='link'
            scale={true}
          >
            {/* <MoreHorizontal size={28} /> */}
          </Button>
        </div>
      </div>
    </section>
  )
}
