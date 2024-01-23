export * from './unauth'
export * from './user-library/library-item'
export * from './user-library/library-nav'
export * from './user-library/library-skeleton'

// 'use client'

// import { Card } from '@/components/ui/card'
// import { sideBarLeftCollapsedAtom } from '@/lib/atoms'
// import { cn } from '@/lib/utils'
// import { useAtom } from 'jotai'
// import { LibraryHeading } from '../library-heading/library-heading'
// import { LibraryNav } from './user-library/library-nav'
// export function SidebarLibrary() {
//   const [sideBarLeftCollapsed] = useAtom(sideBarLeftCollapsedAtom)

//   return (
//     <Card
//       className={cn(
//         `flex h-full w-full flex-col gap-2 overflow-hidden border-none`,
//         sideBarLeftCollapsed && 'gap-0'
//       )}
//     >
//       <LibraryHeading />
//       <div
//         className={cn(
//           'h-full overflow-hidden px-2 pb-0',
//           sideBarLeftCollapsed && 'px-0'
//         )}
//       >
//         {/* <LibraryNav /> */}
//       </div>
//     </Card>
//   )
// }
