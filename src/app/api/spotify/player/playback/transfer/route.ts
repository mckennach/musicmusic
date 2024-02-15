import { NextRequest, NextResponse } from 'next/server'

const url = process.env.SPOTIFY_ENDPOINT
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { token, device_ids, play } = body

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

    if (response.status !== 204) {
      return NextResponse.json(
        {
          error: 'Error transferring playback'
        },
        {
          status: 500
        }
      )
    }

    return NextResponse.json({
      success: true
    })
  } catch (error) {
    return NextResponse.json({
      error
    })
  }

  // try {
  //   const body = await request.json()
  //   const { token } = body
  //   const response = await fetch(`${process.env.SPOTIFY_ENDPOINT!}/me/player`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   })

  //   const data = await response.json()

  //   return NextResponse.json({
  //     ...data
  //   })
  // } catch (error) {
  //   return NextResponse.json({
  //     error
  //   })
  // }
}

// export async function PUT(request: NextRequest) {

//   // try {

//   // } catch (error) {
//   //   return NextResponse.json({
//   //     error
//   //   })
//   // }
// }
