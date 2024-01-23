import { NextRequest, NextResponse } from 'next/server'
import spotify from '@/lib/spotify-sdk'
const url = process.env.SPOTIFY_ENDPOINT;
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token } = body;
  

  // const response = await fetch(`${process.env.NEXTAUTH_URL!}/api/spotify/me`, {
  //   method: 'POST',
  //   body: JSON.stringify({ token }),
  // });

  // const currentUser = await response.json();

  const responses = await Promise.all([
    fetch(`${process.env.NEXTAUTH_URL!}/api/spotify/me`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
    fetch(`${process.env.NEXTAUTH_URL!}/api/spotify/me/artists`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
    fetch(`${process.env.NEXTAUTH_URL!}/api/spotify/me/albums`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
    fetch(`${process.env.NEXTAUTH_URL!}/api/spotify/me/playlists`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
    fetch(`${process.env.NEXTAUTH_URL!}/api/spotify/me/tracks`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
    fetch(`${process.env.NEXTAUTH_URL!}/api/spotify/me/shows`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
    fetch(`${process.env.NEXTAUTH_URL!}/api/spotify/me/episodes`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
    fetch(`${process.env.NEXTAUTH_URL!}/api/spotify/player/playback`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),
    fetch(`${process.env.NEXTAUTH_URL!}/api/spotify/player/devices`, {
      method: 'POST',
      body: JSON.stringify({ token }),
    }),

  ]);

  const [currentUser, artists, albums, playlists, tracks, shows, episodes, playback, devices] = await Promise.all(responses.map(r => r.json()));

 
  return NextResponse.json({
      currentUser,
      artists,
      albums,
      playlists,
      tracks,
      shows,
      episodes,
      playback,
      devices
  })
  
}
