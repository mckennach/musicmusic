import { Session } from 'next-auth'
import { Header } from '@/components/header'
// Components
import { getCsrfToken } from 'next-auth/react'
// Utils
import AppView from '@/components/views/app'
import Main from '@/components/views/main'

const fetchSession = async (token: any) => {
  const resp = await fetch(`${process.env.NEXTAUTH_URL!}api/spotify/me`)
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
  return  (
    <AppView>
      <Header />
      <Main>
        {children}
      </Main>
    </AppView>
    )
}
