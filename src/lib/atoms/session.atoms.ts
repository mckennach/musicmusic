import { AuthSession } from '@/types/sessions.types'
import { atomWithStorage } from 'jotai/utils'
export const sessionAtom = atomWithStorage<AuthSession | null>('session', null)
