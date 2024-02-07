import { NextRequest, NextResponse } from 'next/server'

const url = process.env.SPOTIFY_ENDPOINT!
export async function POST(
  request: NextRequest,
  context: { params: { slug: string[] } }
) {
  try {
    const body = await request.json()
    const searchParams = request.nextUrl.searchParams
    const { token, limit, offset, type, extra_fields } = body

    const queryStr = searchParams ? `?${searchParams.toString()}` : ''

    const url = `${process.env.SPOTIFY_ENDPOINT}/me/${context.params.slug ? context.params.slug?.join('/') : ''}${queryStr}`
    console.log('URL', url)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

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
