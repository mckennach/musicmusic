import { useAtomCallback } from 'jotai/utils'

import React, { useCallback, useEffect, useState } from 'react'

import { useAtom } from 'jotai'

import {
  asyncPlaybackAtom,
  durationAtom,
  durationReadoutAtom,
  isPlayingAtom,
  playbackStateAtom,
  progressAtom,
  progressPercentAtom,
  progressReadoutAtom,
  sessionAtom
} from '@/lib/atoms'

import { ProgressBar } from './progress-bar'

// type SliderProps = React.ComponentProps<typeof Slider>
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ ...props }, ref) => {
    const [, sync] = useAtom(asyncPlaybackAtom)
    const [session] = useAtom(sessionAtom)
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

    const updatePlayback = useAtomCallback(
      useCallback(
        async (get) => {
          await sync()
        },
        [sync]
      )
    )

    useEffect(() => {
      if (!session) return
      const timer = setInterval(async () => {
        updatePlayback()
      }, 1000)
      if (!isPlaying) clearInterval(timer)
      return () => {
        clearInterval(timer)
      }
    }, [updatePlayback, isPlaying, session])

    useEffect(() => {
      if (playbackState && session) {
        setProgress(playbackState.progress_ms)
        setDuration(playbackState.item.duration_ms)
        setIsPlaying(playbackState.is_playing)
      }
    }, [playbackState, session, setProgress, setDuration, setIsPlaying])

    useEffect(() => {
      // console.log('PROGRESS', progressPercent)
    }, [progressPercent])

    if (!progressPercent) return null
    return (
      <div ref={ref} {...props}>
        <div className='min-w-[40px] text-right text-xs text-subdued'>
          <span>{progressReadout}</span>
        </div>
        <ProgressBar
          disabled={!session}
          defaultValue={[0]}
          value={[progressPercent]}
          className='flex w-full items-center justify-center'
        />
        <div className='min-w-[40px] text-left text-xs text-subdued'>
          <span>{durationReadout}</span>
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress }
