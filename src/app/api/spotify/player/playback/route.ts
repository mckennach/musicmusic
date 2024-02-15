import { NextRequest, NextResponse } from 'next/server'

const url = process.env.SPOTIFY_ENDPOINT
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body
    const response = await fetch(`${process.env.SPOTIFY_ENDPOINT!}/me/player`, {
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

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { token, device_ids, play } = body
  console.log(device_ids)

  const response = await fetch(`${process.env.SPOTIFY_ENDPOINT!}/me/player`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      device_ids,
      play
    })
  })

  const data = await response.json()

  console.log('DATA', data)

  return NextResponse.json({
    ...data
  })
  // try {

  // } catch (error) {
  //   return NextResponse.json({
  //     error
  //   })
  // }
}
