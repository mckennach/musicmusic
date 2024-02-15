import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body
    const response = await fetch(
      `${process.env.SPOTIFY_ENDPOINT!}/me/currently-playing`,
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