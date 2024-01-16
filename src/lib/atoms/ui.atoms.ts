import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const sideBarLeftCollapsedAtom = atomWithStorage(
  'sidebar-left-collapsed',
  false
)
export const sideBarRightCollapsedAtom = atomWithStorage(
  'sidebar-right-collapsed',
  false
)

export const forwardRoutesAtom = atom<string[]>([])
export const previousRoutesAtom = atom<string[]>([])

export const sidebarSortByAtom = atom<
  'recents' | 'recently-added' | 'alphabetical' | 'creator'
>('recents')
export const sidebarViewAtom = atom<'grid' | 'list' | 'compact'>('list')
export const sidebarSearchInputAtom = atom<string>('')
export const fullScreenAtom = atom<boolean>(false);
