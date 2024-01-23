// import { authOptions } from '@auth/auth-options'
// import { getServerSession } from 'next-auth'

// import { AuthSession } from '@/types/sessions.types'

// // const session: AuthSession = await getServerSession(authOptions);

// export const resolvers = {
//   Query: {
//     me: async () => {
//       const session: AuthSession | null = await getServerSession(authOptions)
//       const response = await fetch('https://api.spotify.com/v1/me', {
//         headers: {
//           Authorization: `Bearer ${session?.user?.access_token}`
//         }
//       })
//       const data = await response.json()
//       return {
//         ...data,
//         playlists: {
//           ...data.playlists,
//           items: []
//         }
//       }
//     },
//     currentUsersPlaylists: async () => {
//       const session: AuthSession | null = await getServerSession(authOptions)
//       const response = await fetch('https://api.spotify.com/v1/me/playlists', {
//         headers: {
//           Authorization: `Bearer ${session?.user?.access_token}`
//         }
//       })
//       const data = await response.json()
//       return [...data.items]
//     },
//     playlist: async (_: any, { id, userId }: any) => {
//       const session: AuthSession | null = await getServerSession(authOptions)
//       const response = await fetch(
//         `https://api.spotify.com/v1/users/${userId}/playlists/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${session?.user?.access_token}`
//           }
//         }
//       )
//       const data = await response.json()
//       return {
//         ...data
//       }
//     },
//     playlists: async (_: any, { ids }: any) => {
//       const session: AuthSession | null = await getServerSession(authOptions)
//       const response = await fetch(
//         `https://api.spotify.com/v1/playlists?ids=${ids}`,
//         {
//           headers: {
//             Authorization: `Bearer ${session?.user?.access_token}`
//           }
//         }
//       )
//       const data = await response.json()
//       return [...data.playlists]
//     },
//     tracks: async (_: any, { ids }: any) => {
//       const session: AuthSession | null = await getServerSession(authOptions)
//       const response = await fetch(
//         `https://api.spotify.com/v1/tracks?ids=${ids}`,
//         {
//           headers: {
//             Authorization: `Bearer ${session?.user?.access_token}`
//           }
//         }
//       )
//       const data = await response.json()
//       return [...data.tracks]
//     },
//     track: async (_: any, { id }: any) => {
//       const session: AuthSession | null = await getServerSession(authOptions)
//       const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
//         headers: {
//           Authorization: `Bearer ${session?.user?.access_token}`
//         }
//       })
//       const data = await response.json()
//       return {
//         ...data
//       }
//     },
//     user: async (_: any, { id }: any) => {
//       const session: AuthSession | null = await getServerSession(authOptions)
//       const response = await fetch(`https://api.spotify.com/v1/users/${id}`, {
//         headers: {
//           Authorization: `Bearer ${session?.user?.access_token}`
//         }
//       })
//       const data = await response.json()
//       return {
//         ...data
//       }
//     }
//   }
// }
