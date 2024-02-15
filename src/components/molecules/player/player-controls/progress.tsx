'use client'

import { useDebounce } from '@/hooks'
import { useAtomCallback } from 'jotai/utils'

import React, { useCallback, useEffect, useState } from 'react'

import { activeDeviceAtom, isPlayingAtom, playbackStateAtom } from '@/lib/atoms'
import spotify from '@/lib/spotify-sdk'
import { millisToMinutesAndSeconds } from '@/lib/utils'
import { useAtom } from 'jotai'
import { useSession } from 'next-auth/react'
import { ProgressBar } from './progress-bar'
// type SliderProps = React.ComponentProps<typeof Slider>
interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ ...props }, ref) => {
    const [activeDevice] = useAtom(activeDeviceAtom)
    const [playbackState, setPlaybackState] = useAtom(playbackStateAtom)
    const { data: session } = useSession()

    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [progressReadout, setProgressReadout] = useState('-:--')
    const [durationReadout, setDurationReadout] = useState('-:--')
    const [progressPercent, setProgressPercent] = useState(0)
    const [seekingPosition, setSeekingPosition] = useState(0)
    const [isSeeking, setIsSeeking] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom)
    const debouncedPosition = useDebounce(seekingPosition, 300)

    const updatePlayback = useAtomCallback(
      useCallback(async () => {
        if (!activeDevice || !session) return
        spotify.player.getPlaybackState().then((res) => {
          setPlaybackState(res)
          setProgress(res.progress_ms)
          setDuration(res?.item?.duration_ms)
          setIsPlaying(res.is_playing)
        })
      }, [
        activeDevice,
        session,
        setPlaybackState,
        setProgress,
        setDuration,
        setIsPlaying
      ])
    )

    useEffect(() => {
      if (
        session &&
        playbackState &&
        playbackState?.device.id &&
        playbackState.device.is_active
      ) {
        setProgress(playbackState.progress_ms)
        setDuration(playbackState?.item?.duration_ms)
      }
    }, [session, playbackState])

    useEffect(() => {
      setProgressPercent((progress / duration) * 100)
      setProgressReadout(millisToMinutesAndSeconds(progress))
      setDurationReadout(millisToMinutesAndSeconds(duration))
    }, [progress, duration])

    useEffect(() => {
      if (!session || !activeDevice) return
      const timer = setInterval(async () => {
        updatePlayback()
      }, 1000)
      if (!isPlaying) clearInterval(timer)
      return () => {
        clearInterval(timer)
      }
    }, [updatePlayback, isPlaying, session, activeDevice])

    useEffect(() => {
      updatePlayback()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      const newPosition: number = Math.round(
        (debouncedPosition / 100) * duration
      )
      spotify.player.seekToPosition(newPosition).then((res) => {
        updatePlayback()
      })
    }, [duration, debouncedPosition, updatePlayback])

    const handlePositionSeek = (value: number[]) => {
      setSeekingPosition(value[0])
      setIsSeeking(true)
    }

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
