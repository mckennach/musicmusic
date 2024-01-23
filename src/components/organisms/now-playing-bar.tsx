'use client'

// Components
// Utils
import { Session } from 'next-auth'

import { useEffect, useState } from 'react'

import { useAtomValue } from 'jotai'

import { activeDeviceAtom } from '@/lib/atoms'
// import { Sidebar } from '@/components/sidebar'
import { cn } from '@/lib/utils'

import {
  NoDevice,
  NowPlaying,
  PlayerControls,
  PlayerSettings,
  PlayerUnauthorized
} from '@/components/molecules/player'
import { NowPlayingBar } from '@/components/templates'

export function NowPlayingView({ session }: { session: Session | null }) {
  const [loaded, setLoaded] = useState(false)
  const activeDevice = useAtomValue(activeDeviceAtom)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 500)
  }, [activeDevice])
  return (
    <NowPlayingBar>
      {session ? (
        <>
          {activeDevice ? (
            <>
              <NowPlaying
                className={cn(' flex-1 basis-[30%] max-w-[30%] pl-2')}
              />
              <PlayerControls
                className={cn('flex-1 basis-[40%] max-w-[40%]')}
              />
              <PlayerSettings
                className={cn('flex-1 basis-[30%] max-w-[30%]')}
              />
            </>
          ) : (
            <>{loaded && <NoDevice />}</>
            // <NoDevice />
          )}
        </>
      ) : (
        <PlayerUnauthorized />
      )}
    </NowPlayingBar>
  )
}
