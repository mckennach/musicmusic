'use client'

import bgNoise from '@/assets/bg-noise.svg'

import { createContext, useEffect } from 'react'

import { useAtom } from 'jotai'

import {
  currentUserAtom,
  libraryAtom,
  playbackStateAtom,
  sessionAtom
} from '@/lib/atoms'

import { AuthSession, InitialData } from '@/types/database.ds'

const DatabaseContext = createContext<InitialData | null>(null)

export function DatabaseProvider({
  children,
  session,
  initialData
}: {
  children: React.ReactNode
  session: AuthSession | null
  initialData: InitialData | null
}) {
  const [, setCurrentSession] = useAtom(sessionAtom)
  const [, setCurrentUser] = useAtom(currentUserAtom)
  const [, setCurrentLibrary] = useAtom(libraryAtom)
  // const [, setAvailableDevices] = useAtom(availableDevicesAtom)
  const [, setPlaybackState] = useAtom(playbackStateAtom)
  useEffect(() => {
    if (session && initialData) {
      setCurrentSession(session)
      setCurrentUser(initialData.currentUser)
      // setAvailableDevices(initialData.devices?.devices || [])
      setPlaybackState(initialData.playback || {})

      setCurrentLibrary({
        artists: initialData.artists,
        albums: initialData.albums,
        playlists: initialData.playlists,
        tracks: initialData.tracks,
        episodes: initialData.episodes
      })
    }
  }, [
    session,
    initialData,
    // setAvailableDevices,
    setCurrentLibrary,
    setCurrentSession,
    setCurrentUser,
    setPlaybackState
  ])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--background-noise',
      `url(${bgNoise?.src})`
    )
  })

  // useEffect(() => {}, [initialData])

  return <>{children}</>
}
