'use client'

import { Session } from 'next-auth'
import { SessionProvider as Provider } from 'next-auth/react'

import * as React from 'react'

export function SessionProvider({
  children,
  session,
  ...props
}: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <Provider session={session} {...props} refetchInterval={5 * 60}>
      {children}
    </Provider>
  )
}
