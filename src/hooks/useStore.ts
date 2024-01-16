import { useAtom } from 'jotai'
// import { useHydrateAtoms, } from 'jotai/utils'
import {
  asyncAvailableDevicesAtom,
  asyncLibraryAtom,
  asyncPlaybackAtom,
  libraryAtom,
  libraryItemsAtom,
  sessionAtom
} from '@/lib/atoms'
import { AuthSession, LibraryProps } from '@/types'
import { useState } from 'react'
import { useSyncAtoms } from '.'
export function useStore() {
  const [items, setItems] = useAtom(libraryItemsAtom)
  const [currentSession, setCurrentSession] = useAtom(sessionAtom)
  const [library] = useAtom(libraryAtom)
  const [libraryData, setLibraryData] = useState<LibraryProps | null>(null)
  const [, setCurrentLibrary] = useAtom(asyncLibraryAtom)
  const [, setAvailableDevices] = useAtom(asyncAvailableDevicesAtom)
  const [, setPlayback] = useAtom(asyncPlaybackAtom)

  useSyncAtoms([[sessionAtom, currentSession]])

  return {
    initStore: async (session: AuthSession) => {
      if (!session) return
      // console.log('init')
      setCurrentSession(session)
      await setCurrentLibrary()
      await setAvailableDevices()
      await setPlayback()
      return
    },
    update: async (session: AuthSession | null) => {
      // console.log('update');

      // await setPlayback()
      return {}
    },
    reAuth: () => {
      // if(!session) return false;
      // setCurrentSession(session);
      // return true;
    },
    clearStore: async (session: AuthSession | null) => {
      if (!session) return
      setCurrentSession(null)
      return
    }
  }
}
