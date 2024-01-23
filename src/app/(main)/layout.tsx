// Components
// import { ScrollProvider } from '@/context'
// import { Sidebar } from '@/components/sidebar'
// Utils
import { getServerSession } from 'next-auth'

import React from 'react'

import { cookies } from 'next/headers'

import { MainSidebar } from '@/components/organisms/main-sidebar'
import { NowPlayingView } from '@/components/organisms/now-playing-bar'
import { MainLayout, MainView } from '@/components/templates'

import { authOptions } from '../../lib/auth/auth-options'

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const layout = cookies().get('react-resizable-panels:layout')

  let defaultLayout = [28, 72]
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
      </MainLayout>
      <NowPlayingView session={session} />
    </>
  )
}
