import { NextRequest, NextResponse } from 'next/server'

const url = process.env.SPOTIFY_ENDPOINT

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, device_ids, play } = body
    const response = await fetch(
      `${process.env.SPOTIFY_ENDPOINT!}/me/player/seek`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          device_ids,
          play
        })
      }
    )

    const data = await response.json()

    return NextResponse.json({
      ...data
    })
  } catch (error) {
    return NextResponse.json({
      error
    })
  }
}
