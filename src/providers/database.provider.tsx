'use client'
import { useSpotify, useStore } from '@/hooks'
import {
  asyncAvailableDevicesAtom,
  asyncLibraryAtom,
  asyncPlaybackAtom,
  libraryAtom,
  libraryItemsAtom,
  sessionAtom
} from '@/lib/atoms'
import { AuthSession, LibraryProps } from '@/types'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export function DatabaseProvider({
  children,
  session,
  user
}: {
  children: React.ReactNode
  session: AuthSession | null
  user: any
}) {
  const spotify = useSpotify()
  const appStore = useStore()
  const [items, setItems] = useAtom(libraryItemsAtom)
  const [currentSession, setCurrentSession] = useAtom(sessionAtom)
  const [library] = useAtom(libraryAtom)
  const [libraryData, setLibraryData] = useState<LibraryProps | null>(null)
  const [, setCurrentLibrary] = useAtom(asyncLibraryAtom)
  const [, setAvailableDevices] = useAtom(asyncAvailableDevicesAtom)
  const [, setPlayback] = useAtom(asyncPlaybackAtom)
  // const counterAtom = atomWithObservable(() => playbackState?.shuffle_state, false)

  useEffect(() => {
    ;(async () => {
      if (currentSession) {
        // console.log('update library')
        await setCurrentLibrary()
      }
    })()
  }, [currentSession, setCurrentLibrary])

  useEffect(() => {
    ;(async () => {
      if (currentSession) {
        // console.log('update devices')
        await setAvailableDevices()
      }
    })()
  }, [currentSession, setAvailableDevices])

  useEffect(() => {
    ;(async () => {
      if (currentSession) {
        // console.log('update playback')
        await setPlayback()
      }
    })()
  }, [currentSession, setPlayback])

  useEffect(() => {
    if (session) {
      setCurrentSession(session)
      spotify.setAccessToken(session?.user?.access_token)
    } else {
      setCurrentSession(null)
    }
  }, [session, setCurrentSession, spotify])

  return <>{children}</>
}
