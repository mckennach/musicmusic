'use client'

import bgNoise from '@/assets/bg-noise.svg'

import { useEffect } from 'react'

import { useAtom } from 'jotai'

import {
  availableDevicesAtom,
  currentUserAtom,
  libraryAtom,
  playbackStateAtom,
  sessionAtom
} from '@/lib/atoms'

import { AuthSession, InitialData } from '@/types/database.ds'

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
  const [, setAvailableDevices] = useAtom(availableDevicesAtom)
  const [, setPlaybackState] = useAtom(playbackStateAtom)
  useEffect(() => {
    if (session && initialData) {
      console.log('hit')
      setCurrentSession(session)
      setCurrentUser(initialData.currentUser)

      // return;
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
    setAvailableDevices,
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
  }, [bgNoise])

  return <>{children}</>
}
