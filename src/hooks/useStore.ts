// // import { useHydrateAtoms, } from 'jotai/utils'
// import { useState } from 'react'

// import { useAtom } from 'jotai'

// import {
//   asyncAvailableDevicesAtom,
//   asyncLibraryAtom,
//   asyncPlaybackAtom,
//   libraryAtom,
//   libraryItemsAtom,
//   sessionAtom
// } from '@/lib/atoms'

// import { useSyncAtoms } from '.'

// import { AuthSession, LibraryProps } from '@/types/database.ds'

// export function useStore() {
//   const [items, setItems] = useAtom(libraryItemsAtom)
//   const [currentSession, setCurrentSession] = useAtom(sessionAtom)
//   const [library] = useAtom(libraryAtom)
//   const [libraryData, setLibraryData] = useState<LibraryProps | null>(null)
//   const [, setCurrentLibrary] = useAtom(asyncLibraryAtom)
//   const [, setAvailableDevices] = useAtom(asyncAvailableDevicesAtom)
//   const [, setPlayback] = useAtom(asyncPlaybackAtom)

//   useSyncAtoms([[sessionAtom, currentSession]])

//   return {
//     initStore: async (session: AuthSession) => {
//       if (!session) return
//       // console.log('bam')
//       await setCurrentLibrary()
//       await setAvailableDevices()
//       await setPlayback()
//       return
//     },
//     update: async (session: AuthSession | null) => {
//       // console.log('update');

//       // await setPlayback()
//       return {}
//     },
//     reAuth: () => {
//       // if(!session) return false;
//       // setCurrentSession(session);
//       // return true;
//     },
//     clearStore: async (session: AuthSession | null) => {
//       if (!session) return
//       setCurrentSession(null)
//       return
//     }
//   }
// }
