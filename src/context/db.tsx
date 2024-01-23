// 'use client'

// import { AuthSession, InitialData } from "@/types/database.ds"
// import { useEffect } from "react"
// import { useAtom } from "jotai"
// import { sessionAtom, currentUserAtom, libraryAtom, availableDevicesAtom, playbackStateAtom } from "@/lib/atoms"
// export function DatabaseProvider({ 
//   children, 
//   session, 
//   initialData 
// }: { 
//   children: React.ReactNode
//   session: AuthSession| null
//   initialData: InitialData | null
// }) {
//   const [, setCurrentSession] = useAtom(sessionAtom);
//   const [, setCurrentUser] = useAtom(currentUserAtom);
//   const [, setCurrentLibrary] = useAtom(libraryAtom);
//   const [, setAvailableDevices] = useAtom(availableDevicesAtom);
//   const [, setPlaybackState] = useAtom(playbackStateAtom);
//   useEffect(() => {
//     if(session && initialData) {
//       setCurrentSession(session);
//       setCurrentUser(initialData.currentUser);
//       setCurrentLibrary(
//         {
//           artists: initialData.artists,
//           albums: initialData.albums,
//           playlists: initialData.playlists,
//           tracks: initialData.tracks,
//           episodes: initialData.episodes,
//         }
//       )
//       setAvailableDevices(initialData.devices.devices);
//       setPlaybackState(initialData.playback);
//     }
//   }, [session, initialData])


//   return (
//     <>{children}</>
//   )
// }