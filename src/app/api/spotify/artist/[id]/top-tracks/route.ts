import { NextRequest, NextResponse } from 'next/server'

const url = process.env.SPOTIFY_ENDPOINT
export async function POST(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { params } = context
  try {
    const body = await request.json()
    const { token, ids } = body
    const response = await fetch(
      `${process.env.SPOTIFY_ENDPOINT!}/artists/${params?.id}/top-tracks?market=US`,
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
