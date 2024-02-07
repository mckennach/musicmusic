import { notFound } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
const url = process.env.SPOTIFY_ENDPOINT
export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context
  try {
    const body = await request.json()
    const { token, limit, after } = body
    const response = await fetch(
      `${process.env.SPOTIFY_ENDPOINT!}/playlists/${params?.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (
      response.status === 404 ||
      response.status === 401 ||
      response.status === 502 ||
      response.status === 401
    ) {
      return notFound()
    }

    const data = await response.json()

    return NextResponse.json({
      ...data
    })
  } catch (error) {
    return NextResponse.error()
  }
}
