import { getRecommendations } from '@/services/server/queries/recommendations.query'

import { NextRequest, NextResponse } from 'next/server'

import spotify from '@/lib/spotify-sdk'

const url = process.env.SPOTIFY_ENDPOINT
export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context
  try {
    const body = await request.json()
    const {
      token,
      params: {
        seed_tracks,
        limit,
      }
    } = body;


    const response = await fetch(`${url}/recommendations?limit=${limit ?? 10}&seed_tracks=${seed_tracks}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();


    return NextResponse.json({
      ...data
    })

    // const data = await getRecommendations();

    // const response = await fetch(
    //   `${process.env.SPOTIFY_ENDPOINT!}/playlists/${params?.id}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   }
    // )

    // const data = await response.json()

    // return NextResponse.json({
    //   ...data
    // })
  } catch (error) {
    return NextResponse.json({
      error
    })
  }
}
