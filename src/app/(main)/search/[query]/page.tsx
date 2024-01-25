import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth/auth-options'

import { Card } from '@/components/ui/card'

import { AuthSession } from '@/types/database.ds'

const fetchSearchResults = async (
  query: string,
  session: AuthSession | null
) => {
  if (session) {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL!}/api/spotify/search/${query}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: session.user?.access_token
        }),
        method: 'POST'
      }
    )
    return response.json()
  }
  return null
}

export default async function Search({
  params
}: {
  params: { query: string }
}) {
  const session: AuthSession | null = await getServerSession(authOptions)
  const searchResults = await fetchSearchResults(params?.query, session)
  return (
    <div className='space-y-4 w-full'>
      <h1>Search</h1>
      <div className='flex gap-2 w-full justify-between'>
        <Card className='p-4 flex-1'>
          <h2 className='text-2xl font-bold mb-2'>Artists</h2>
          <ul>
            {/* {JSON.stringify(searchResults.artists, null, 2)} */}
            {searchResults &&
              searchResults.artists &&
              searchResults.artists?.items.map((track: any) => {
                return <li key={track.name}>{track.name}</li>
              })}
          </ul>
        </Card>
        <Card className='p-4 flex-1'>
          <h2 className='text-2xl font-bold mb-2'>Tracks</h2>
          <ul>
            {searchResults &&
              searchResults.tracks &&
              searchResults.tracks.items.map((track: any) => {
                return <li key={track.name}>{track.name}</li>
              })}
          </ul>
        </Card>
      </div>

      <Card className='p-4'>
        <h2 className='text-2xl font-bold mb-2'>Albums</h2>
        <ul>
          {/* {JSON.stringify(searchResults.artists, null, 2)} */}
          {searchResults &&
            searchResults.albums &&
            searchResults.albums?.items.map((track: any) => {
              return <li key={track.name}>{track.name}</li>
            })}
        </ul>
      </Card>
      <Card className='p-4'>
        <h2 className='text-2xl font-bold mb-2'>Playlists</h2>
        <ul>
          {/* {JSON.stringify(searchResults.artists, null, 2)} */}
          {searchResults &&
            searchResults.playlists &&
            searchResults.playlists?.items.map((track: any) => {
              return <li key={track.name}>{track.name}</li>
            })}
        </ul>
      </Card>
      <Card className='p-4'>
        <h2 className='text-2xl font-bold mb-2'>Shows</h2>
        <ul>
          {searchResults &&
            searchResults.shows &&
            searchResults.shows.items.map((track: any) => {
              return <li key={track.name}>{track.name}</li>
            })}
        </ul>
      </Card>
      <Card className='p-4'>
        <h2 className='text-2xl font-bold mb-2'>Episodes</h2>
        <ul>
          {searchResults &&
            searchResults.episodes &&
            searchResults.episodes.items.map((track: any) => {
              return <li key={track.name}>{track.name}</li>
            })}
        </ul>
      </Card>
    </div>
  )
}
