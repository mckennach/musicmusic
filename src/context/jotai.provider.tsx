'use client'

import { Provider } from 'jotai'

import { store } from '@/lib/atoms'

export function JotaiProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
