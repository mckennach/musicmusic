'use client'

import { AuthSession } from '@/types'

import { useEffect } from 'react'

import { useAtom } from 'jotai'

import {
  asyncAvailableDevicesAtom,
  asyncLibraryAtom,
  asyncPlaybackAtom,
  libraryItemsAtom,
  sessionAtom
} from '@/lib/atoms'
import spotify from '@/lib/spotify-sdk'

export function DatabaseProvider({
  children,
  session,
  user
}: {
  children: React.ReactNode
  session: AuthSession | null
  user: any
}) {
  // const appStore = useStore()
  const [items, setItems] = useAtom(libraryItemsAtom)
  const [currentSession, setCurrentSession] = useAtom(sessionAtom)
  // const [library] = useAtom(libraryAtom)
  // const [libraryData, setLibraryData] = useState<LibraryProps | null>(null)
  const [, setCurrentLibrary] = useAtom(asyncLibraryAtom)
  const [, setAvailableDevices] = useAtom(asyncAvailableDevicesAtom)
  const [, setPlayback] = useAtom(asyncPlaybackAtom)
  // const counterAtom = atomWithObservable(() => playbackState?.shuffle_state, false)

  useEffect(() => {}, [])

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
      // spotify.setAccessToken(session?.user?.access_token)
    } else {
      setCurrentSession(null)
    }
  }, [session, setCurrentSession])

  return <>{children}</>
}
