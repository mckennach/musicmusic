import { getServerSession } from 'next-auth'
import { getCsrfToken } from 'next-auth/react'

import { NextResponse } from 'next/server'

import { authOptions } from '../../../lib/auth/auth-options'

export async function GET() {
  const session = await getServerSession(authOptions)
  const csrfToken = await getCsrfToken()
  return NextResponse.json({
    csrfToken,
    session
  })
}
