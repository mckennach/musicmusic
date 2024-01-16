import { Session } from 'next-auth'

// Components
import { getCsrfToken } from 'next-auth/react'
// Utils
import MainView from '@/views/main.view'

const fetchSession = async (token: any) => {
  const resp = await fetch('http://localhost:3000/api/spotify/me')
  const data = await resp.json()
  return data
}

export default async function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  const token = await getCsrfToken()
  const session: Session | null = await fetchSession(token)
  return <MainView>{children}</MainView>
}
