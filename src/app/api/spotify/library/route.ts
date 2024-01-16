import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { token } = body

  const albumsResp = await fetch('https://api.spotify.com/v1/me/albums', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const albums = await albumsResp.json()

  const playlistsResp = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const playlists = await playlistsResp.json()

  const trackResp = await fetch('https://api.spotify.com/v1/me/tracks', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const tracks = await trackResp.json()

  const artistResp = await fetch(
    'https://api.spotify.com/v1/me/following?type=artist',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  )

  const artists = await artistResp.json()

  const episodesResp = await fetch('https://api.spotify.com/v1/me/episodes', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const episodes = await episodesResp.json()

  const showsResp = await fetch('https://api.spotify.com/v1/me/shows', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  const shows = await showsResp.json()

  return NextResponse.json({
    albums,
    tracks,
    artists,
    shows,
    playlists,
    episodes
  })
}
