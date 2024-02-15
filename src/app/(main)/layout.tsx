// Components
// import { ScrollProvider } from '@/context'
// import { Sidebar } from '@/components/sidebar'
// Utils
import { getServerSession } from 'next-auth'

import React from 'react'

import { cookies } from 'next/headers'

import { NowPlayingView } from '@/components/organisms/now-playing-bar'
import { MainSidebar } from '@/components/organisms/sidebars/main-sidebar'
import { MainLayout, MainView } from '@/components/templates'

import { authOptions } from '../../lib/auth/auth-options'

import { AuthSession } from '@/types/database.ds'

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const session: AuthSession | null = await getServerSession(authOptions)
  const layout = cookies().get('react-resizable-panels:layout')

  let defaultLayout = [28, 72, 0]
  if (layout) {
    defaultLayout = JSON.parse(layout.value)
  }

  return (
    <>
      <MainLayout>
        <MainSidebar defaultLayout={defaultLayout} session={session} />
        <MainView defaultSize={defaultLayout[1]} id='MainView' order={2}>
          {children}
        </MainView>
        {/* <SecondarySidebar defaultLayout={defaultLayout} session={session} /> */}
      </MainLayout>
      <NowPlayingView session={session} />
    </>
  )
}
