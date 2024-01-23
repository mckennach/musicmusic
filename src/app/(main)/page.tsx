import { getServerSession } from 'next-auth'

import { cookies } from 'next/headers'

import { Home } from '@/components/templates/home'
import { BackgroundFade } from '@/components/ui/background-fade'

import { authOptions } from '../../lib/auth/auth-options'
import { LOGIN_URL } from '../../lib/auth/spotify-profile'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return <Home />
}
