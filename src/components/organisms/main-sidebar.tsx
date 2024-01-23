import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options'
// Components
import { getServerSession, Session } from 'next-auth'

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
import {
  MainLayout,
  MainView,
  NowPlayingBar,
  Sidebar,
  SidebarLibrary
} from '@/components/templates'

export function MainSidebar({
  defaultLayout,
  session
}: {
  defaultLayout: number[]
  session: Session | null
}) {
  return (
    <Sidebar
      side='left'
      order={1}
      collapsible={true}
      collapsedSize={6}
      minSize={20}
      maxSize={35}
      defaultSize={defaultLayout[0]}
      id='Sidebar-Left'
    >
      <SidebarNav />
      <SidebarLibrary>
        {session ? <LibraryNav /> : <SidebarSignIn />}
      </SidebarLibrary>
    </Sidebar>
  )
}
