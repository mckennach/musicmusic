import { NextRequest, NextResponse } from 'next/server'

const url = process.env.SPOTIFY_ENDPOINT
export async function POST(
  request: NextRequest,
  context: { params: { type: string } }
) {
  const { params } = context
  try {
    const body = await request.json()
    const { token, time_range, limit, offset } = body
    const response = await fetch(
      `${process.env.SPOTIFY_ENDPOINT!}/me/top/${params?.type}?time_range=${time_range ?? 'medium_term'}&limit=${limit ?? 20}&offset=${offset ?? 0}`,
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
