'use client'

import { store } from '@/lib/atoms'
import { Provider } from 'jotai'

export function JotaiProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
