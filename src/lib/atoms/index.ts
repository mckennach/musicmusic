import { useSpotify } from '@/hooks'
// import { ErrorType, LibraryFilterTypes, LibraryItem } from '../../../types/auth.ds'
import { Device, MaxInt, PlaybackState, User } from '@spotify/web-api-ts-sdk'
import { atomWithStorage } from 'jotai/utils'

import { atom, createStore } from 'jotai'

import spotify from '@/lib/spotify-sdk'

import { millisToMinutesAndSeconds } from '../utils'

import {
  AuthSession,
  ErrorType,
  LibraryFilterTypes,
  LibraryItem,
  LibraryProps
} from '@/types/database.ds'

export const store = createStore()
// ====================
// Session Atoms & Users
// ====================

export const sessionAtom = atomWithStorage<AuthSession | null>('session', null)

export const currentUserAtom = atomWithStorage<User | null>('currentUser', null)

// ====================
// Search Atoms
// ====================

export const searchQueryAtom = atomWithStorage<string>('search-query', '')
export const recentSearchesAtom = atomWithStorage<any[]>('recent-searches', [])

// ====================
// Library Atoms
// ====================

export const asyncLibraryAtom = atom(null, async (get, set) => {
  const { fetchLibrary } = useSpotify()
  const accessToken = get(sessionAtom)?.user?.access_token
  if (!accessToken) return null
  const data = await fetchLibrary()
  if (!data) return set(libraryAtom, null)
  return set(libraryAtom, data)
})
export const libraryAtom = atomWithStorage<LibraryProps | null>('library', null)

export const activeLibFilterAtom = atomWithStorage<LibraryFilterTypes>(
  'library-filter',
  '*'
)
export const libraryErrorAtom = atom(null)
export const libraryItemsAtom = atom<LibraryItem[]>((get) => {
  const library = get(libraryAtom)
  const { createLibraryItems } = useSpotify()
  if (!library) return []

  return createLibraryItems(library)
})

// ====================
// Errors
// ====================

export const errorAtom = atom(false)
export const errorMessageAtom = atom<ErrorType>('')

// ====================
// Active Items
// ====================

export const activeTrackOrEpisodeAtom = atomWithStorage<string | null>(
  'active-track-or-episode',
  null
)
export const activePlaylistAtom = atomWithStorage<string | null>(
  'active-playlist',
  null
)

// ====================
// Player Status
// ====================

export const activeContextUriAtom = atomWithStorage<string | null>(
  'active-context-uri',
  null
)

export const asyncPlaybackAtom = atom(null, async (get, set) => {
  const accessToken = get(sessionAtom)?.user?.access_token
  if (!accessToken) return null

  const playbackState = await spotify.player?.getPlaybackState()

  if (!playbackState) {
    set(noDeviceFoundAtom, true)
    set(errorMessageAtom, 'no-device')
    set(errorAtom, true)
    return
  }

  return set(playbackStateAtom, playbackState)
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

// ====================
// Devices Atoms
// ====================

export const deviceModalOpenAtom = atom(false)

export const asyncAvailableDevicesAtom = atom(null, async (get, set) => {
  const accessToken = get(sessionAtom)?.user?.access_token
  if (!accessToken) return null
  const { devices } = await spotify.player?.getAvailableDevices()

  if (!devices) {
    set(noDeviceFoundAtom, true)
    set(errorMessageAtom, 'no-device')
    set(errorAtom, true)
  }
  return set(availableDevicesAtom, devices)
})

export const availableDevicesAtom = atomWithStorage<Device[] | null>(
  'devices',
  null
)
export const activeDeviceAtom = atom<Device | null>((get) => {
  const availableDevices = get(availableDevicesAtom)
  if (!availableDevices || availableDevices.length === 0) return null
  const activeDevice = availableDevices.find((device) => device.is_active)

  // const setActiveDevice = await transferPlayBack(se)

  return activeDevice ? activeDevice : null
})
export const activeDeviceTypeAtom = atom<
  'no-device' | 'computer' | 'speaker' | 'smartphone'
>((get) => {
  const activeDevice = get(activeDeviceAtom)
  if (!activeDevice) return 'no-device'
  if (activeDevice.type === 'Computer') return 'computer'
  if (activeDevice.type === 'Speaker') return 'speaker'
  if (activeDevice.type === 'Smartphone') return 'smartphone'
  return 'no-device'
})

export const noDeviceFoundAtom = atom(false)

// ====================
// UI Atoms
// ====================

export const bannerImageAtom = atom<string | null>(null)

export const mainPanelWidthAtom = atomWithStorage<number | null>(
  'main-panel-width',
  null
)
export const columnCountAtom = atom<MaxInt<50>>(5)
export const rowCountAtom = atom<MaxInt<50>>(6)

export const mainContainerScrolledAtom = atom(false)
export const mainContainerScrollPositionAtom = atom(0)
export const sideBarLeftWidthAtom = atomWithStorage<number | null>(
  'sidebar-left-width',
  null
)
export const sideBarLeftCollapsedAtom = atomWithStorage(
  'sidebar-left-collapsed',
  false
)
export const sideBarRightCollapsedAtom = atomWithStorage(
  'sidebar-right-collapsed',
  false
)

export const forwardRoutesAtom = atom<string[]>([])
export const previousRoutesAtom = atom<string[]>([])

export const sidebarSortByAtom = atom<
  'recents' | 'recently-added' | 'alphabetical' | 'creator'
>('recents')
export const sidebarViewAtom = atom<'grid' | 'list' | 'compact'>('list')
export const sidebarSearchInputAtom = atom<string>('')
export const fullScreenAtom = atom<boolean>(false)
