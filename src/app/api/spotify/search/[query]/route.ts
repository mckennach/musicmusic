import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  context: { params: { query: string } }
) {
  const { params } = context
  try {
    const body = await request.json()
    const { token, limit, offset, type } = body

    const response = await fetch(
      `${process.env.SPOTIFY_ENDPOINT!}/search?q=${params.query}&type=${type ?? 'artist%2Calbum%2Ctrack'}&limit=${limit ?? 10}&offset=${offset ?? 0}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
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
