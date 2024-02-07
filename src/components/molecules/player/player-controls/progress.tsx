'use client'

import { useDebounce } from '@/hooks'
import { useAtomCallback } from 'jotai/utils'

import React, { useCallback, useEffect, useState } from 'react'

import { useAtom } from 'jotai'

import {
  activeDeviceAtom,
  durationAtom,
  durationReadoutAtom,
  isPlayingAtom,
  playbackStateAtom,
  progressAtom,
  progressPercentAtom,
  progressReadoutAtom,
  sessionAtom
} from '@/lib/atoms'
import spotify from '@/lib/spotify-sdk'
import { ProgressBar } from './progress-bar'
// type SliderProps = React.ComponentProps<typeof Slider>
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ ...props }, ref) => {
    const [activeDevice] = useAtom(activeDeviceAtom)

    const [playbackState, setPlaybackState] = useAtom(playbackStateAtom)
    const [session] = useAtom(sessionAtom)
    const [progress, setProgress] = useAtom(progressAtom)
    const [duration, setDuration] = useAtom(durationAtom)
    const [progressPercent] = useAtom(progressPercentAtom)
    const [durationReadout] = useAtom(durationReadoutAtom)
    const [progressReadout] = useAtom(progressReadoutAtom)
    const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom)
    const [seekingPosition, setSeekingPosition] = useState<number>(0)
    const [isSeeking, setIsSeeking] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const debouncedPosition = useDebounce(seekingPosition, 300)

    const updatePlayback = useAtomCallback(
      useCallback(
        async (get) => {
          if (!activeDevice || !session) return
          spotify.player.getPlaybackState().then((res) => {
            setPlaybackState(res)
            setProgress(res.progress_ms)
            setDuration(res?.item?.duration_ms)
            setIsPlaying(res.is_playing)
          })
        },
        [
          activeDevice,
          session,
          setPlaybackState,
          setProgress,
          setDuration,
          setIsPlaying
        ]
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
      if (session && activeDevice) {
        spotify.player.getPlaybackState().then((res) => {
          setPlaybackState(res)
          setProgress(res.progress_ms)
          setDuration(res?.item?.duration_ms)
          setIsPlaying(res.is_playing)
        })
      }
    }, [
      activeDevice,
      session,
      setPlaybackState,
      setProgress,
      setDuration,
      setIsPlaying
    ])

    const handlePositionSeek = async (value: number[]) => {
      setSeekingPosition(value[0])
      setIsSeeking(true)
    }

    useEffect(() => {
      const newPosition: number = Math.round(
        (debouncedPosition / 100) * duration
      )
      spotify.player.seekToPosition(newPosition).then((res) => {
        updatePlayback()
      })
    }, [duration, debouncedPosition, updatePlayback])

    if (!progressPercent) return null
    return (
      <div ref={ref} {...props}>
        <div className='min-w-[40px] text-right text-xs text-white/80'>
          <span>{progressReadout}</span>
        </div>
        <ProgressBar
          onValueChange={handlePositionSeek}
          // onValueCommit={() => setIsSeeking(false)}
          disabled={!session}
          defaultValue={[0]}
          value={isSeeking ? [seekingPosition] : [progressPercent]}
          className='flex w-full items-center justify-center'
        />
        <div className='min-w-[40px] text-left text-xs text-white/80'>
          <span>{durationReadout}</span>
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export { Progress }
