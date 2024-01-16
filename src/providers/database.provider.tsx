'use client'
import { useStore } from '@/hooks'
import { libraryItemsAtom, sessionAtom } from '@/lib/atoms'
import { AuthSession } from '@/types'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export function DatabaseProvider({
  children,
  session,
  user
}: {
  children: React.ReactNode
  session: AuthSession | null
  user: any
}) {
  const appStore = useStore()
  const [items, setItems] = useAtom(libraryItemsAtom)
  const [currentSession, setCurrentSession] = useAtom(sessionAtom)

  useEffect(() => {
    // console.log('change');
    if (appStore) {
      if (session) {
        console.log('init')
        appStore.initStore(session)
      } else {
        console.log('clear')
        appStore.clearStore(session)
      }
    }
  }, [session, currentSession, appStore])

  return <>{children}</>
}
