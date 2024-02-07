import { NextRequest, NextResponse } from 'next/server'

const url = process.env.SPOTIFY_ENDPOINT
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, limit, offset } = body
    const searchParams = request.nextUrl.searchParams

    const queryStr = searchParams ? `?${searchParams.toString()}` : ''
    const response = await fetch(
      `${process.env.SPOTIFY_ENDPOINT!}/me/tracks${queryStr}`,
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
