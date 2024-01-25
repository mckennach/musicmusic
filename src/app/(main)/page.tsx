import { getServerSession } from 'next-auth'

import { Home } from '@/components/templates/home'

import { authOptions } from '../../lib/auth/auth-options'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  return <Home />
}
