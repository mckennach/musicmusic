import { NextRequest, NextResponse } from 'next/server'
import spotify from '@/lib/spotify-sdk'
const url = process.env.SPOTIFY_ENDPOINT;
export async function POST(request: NextRequest) {

  try {
    const body = await request.json();
    const { token, limit, offset } = body;
    const response = await fetch(`${process.env.SPOTIFY_ENDPOINT!}/me/playlists`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    return NextResponse.json({
      ...data
    })
  } catch (error) {
    return NextResponse.json({
      error
    })
  }

  
}
