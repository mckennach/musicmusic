// Components
import { ScrollProvider } from '@/context'
import { getServerSession } from 'next-auth'

import React from 'react'

import { cookies } from 'next/headers'

// import { Sidebar } from '@/components/sidebar'
import { cn } from '@/lib/utils'

// Utils
import {
  LibraryNav,
  SidebarNav,
  SidebarSignIn
} from '@/components/molecules/main-sidebar'
import {
  NowPlaying,
  PlayerControls,
  PlayerSettings,
  PlayerUnauthorized
} from '@/components/molecules/player'
import { MainSidebar } from '@/components/organisms/main-sidebar'
import { NowPlayingView } from '@/components/organisms/now-playing-bar'
import {
  MainLayout,
  MainView,
  NowPlayingBar,
  Sidebar,
  SidebarLibrary
} from '@/components/templates'

import { authOptions } from '../api/auth/[...nextauth]/auth-options'

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const layout = cookies().get('react-resizable-panels:layout')

  let defaultLayout = [35, 65]
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
