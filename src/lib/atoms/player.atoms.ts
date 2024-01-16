import { ErrorType } from '@/types'
import { PlaybackState } from '@spotify/web-api-ts-sdk'
import { atom } from 'jotai'

import { atomWithStorage } from 'jotai/utils'
import { noDeviceFoundAtom, sessionAtom } from '.'
import { millisToMinutesAndSeconds } from '../utils/time'
// Errors
export const errorAtom = atom(false)
export const errorMessageAtom = atom<ErrorType>('')

// ====================
// Player Atoms
// ====================

// ====================
// Player Status
// ====================

export const asyncPlaybackAtom = atom(null, async (get, set) => {
  const accessToken = get(sessionAtom)?.user?.access_token
  if (!accessToken) return null

  const resp = await fetch('https://api.spotify.com/v1/me/player', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  if (resp.status !== 200) {
    if (resp.status === 204) {
      set(noDeviceFoundAtom, true)
      set(errorMessageAtom, 'no-device')
      set(errorAtom, true)
      return
    }

    if (resp.status === 401 || resp.status === 403) {
      set(errorMessageAtom, 'unauthorized')
      set(errorAtom, true)
      return
    }

    if (resp.status === 429) {
      set(errorMessageAtom, 'limit')
      set(errorAtom, true)
      return
    }

    set(noDeviceFoundAtom, true)
    set(errorMessageAtom, 'no-device')
    set(errorAtom, true)
    return
  }
  const data = await resp.json()
  return set(playbackStateAtom, data)
})

export const playbackStateAtom = atomWithStorage<PlaybackState | null>(
  'playback',
  null
)

// ====================
// Player Volumes
// ====================

export const volumeAtom = atomWithStorage<number>('volume', 0)
export const volumeMutedAtom = atomWithStorage<boolean>('volumeMuted', false)
export const volumeBeforeMutedAtom = atomWithStorage<number>(
  'volumeBeforeMuted',
  50
)

export const isPlayingAtom = atomWithStorage<boolean>('isPlaying', false)
export const progressAtom = atomWithStorage<number>('progress', 0)
export const durationAtom = atomWithStorage<number>('duration', 0)

export const progressPercentAtom = atom<number>(
  (get) => (get(progressAtom) / get(durationAtom)) * 100
)
export const durationReadoutAtom = atom<string>((get) => {
  const duration = get(durationAtom)
  if (duration === 0) return '-:--'
  return millisToMinutesAndSeconds(duration)
})

export const progressReadoutAtom = atom<string>((get) => {
  const progress = get(progressAtom)
  const duration = get(durationAtom)
  if (duration === 0) return '-:--'
  return millisToMinutesAndSeconds(progress)
})

// const counterAtom = atomWithObservable(() => playbackStateAtom)

export const shuffleStateAtom = atomWithStorage<PlaybackState['shuffle_state']>(
  'shuffleState',
  false
)

export const repeatStateAtom = atomWithStorage<PlaybackState['repeat_state']>(
  'repeatState',
  'off'
)
