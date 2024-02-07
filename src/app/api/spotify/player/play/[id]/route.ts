import { NextRequest, NextResponse } from 'next/server'

const url = process.env.SPOTIFY_ENDPOINT
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { token, context_uri, offset, position_ms } = body
    const response = await fetch(
      `${process.env.SPOTIFY_ENDPOINT!}/me/player/play?device_id=${context.params.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          context_uri,
          offset: {
            position: offset
          },
          position_ms
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
