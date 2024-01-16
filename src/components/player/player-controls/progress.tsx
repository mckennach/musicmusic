import { useSpotify } from '@/hooks'
import {
  durationAtom,
  durationReadoutAtom,
  isPlayingAtom,
  playbackStateAtom,
  progressAtom,
  progressPercentAtom,
  progressReadoutAtom
} from '@/lib/atoms'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { ProgressBar } from './progress-bar'

// type SliderProps = React.ComponentProps<typeof Slider>
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ ...props }, ref) => {
    const spotify = useSpotify()
    const [playbackState, setPlaybackState] = useAtom(playbackStateAtom)
    const [progress, setProgress] = useAtom(progressAtom)
    const [duration, setDuration] = useAtom(durationAtom)
    const [progressPercent, setProgressPercent] = useAtom(progressPercentAtom)
    const [durationReadout, setDurationReadout] = useAtom(durationReadoutAtom)
    const [progressReadout, setProgressReadout] = useAtom(progressReadoutAtom)
    const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom)
    const [isSeeking, setIsSeeking] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
      if (playbackState) {
        console.log('UPDATED')
        setProgress(playbackState.progress_ms)
        setDuration(playbackState.item.duration_ms)
        setIsPlaying(playbackState.is_playing)
      }
    }, [playbackState, setProgress, setDuration, setIsPlaying])

    useEffect(() => {
      console.log('PROGRESS', progressPercent)
    }, [progressPercent])

    return (
      <div ref={ref} {...props}>
        <div className='min-w-[40px] text-right text-xs text-subdued'>
          <span>{progressReadout}</span>
        </div>
        <ProgressBar className='flex w-full items-center justify-center' />
        <div className='min-w-[40px] text-left text-xs text-subdued'>
          <span>{durationReadout}</span>
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress }
