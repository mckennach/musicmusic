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

export function NowPlayingView({ session }: { session: Session | null }) {
  return (
    <NowPlayingBar>
      {session ? (
        <>
          {/* test */}
          <NowPlaying
              className={cn(' flex-1 basis-[30%] max-w-[30%] pl-2')}
            />
            <PlayerControls className={cn('flex-1 basis-[40%] max-w-[40%]')} />
            <PlayerSettings className={cn('flex-1 basis-[30%] max-w-[30%]')} />
        </>
      ) : (
        // <>test</>
        <PlayerUnauthorized />
      )}
    </NowPlayingBar>
  )
}
