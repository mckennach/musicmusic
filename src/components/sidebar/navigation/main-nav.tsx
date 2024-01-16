'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { sideBarLeftCollapsedAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { Home, LucideIcon, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  icon: LucideIcon
  path: string
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    icon: Home,
    path: '/'
  },
  {
    label: 'Search',
    icon: Search,
    path: '/search'
  }
]

export function SidebarNav() {
  const pathname = usePathname()

  const [sideBarLeftCollapsed, setSidebarLeftCollaposed] = useAtom(
    sideBarLeftCollapsedAtom
  )

  if (sideBarLeftCollapsed) {
    return (
      <Card
        className={cn(
          'flex w-full flex-col gap-2 border-none px-3 py-2',
          sideBarLeftCollapsed && `justify-center p-1.5`
        )}
      >
        {navItems.map((item) => (
          <Button
            className={cn(
              `text-base/80 !hover:bg-transparent flex justify-center gap-4 !px-1.5 font-bold hover:text-base after:hover:bg-transparent`,
              pathname === item.path
                ? 'text-white'
                : 'text-accent-foreground/80 hover:text-white'
            )}
            key={item.label}
            variant='ghost'
            size='sm'
            asChild
          >
            <Link href={item.path}>
              <item.icon size={20} />
            </Link>
          </Button>
        ))}
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        'flex w-full flex-col gap-2 border-none px-3 py-2',
        sideBarLeftCollapsed && `justify-center p-1.5`
      )}
    >
      {navItems.map((item) => (
        <Button
          className={cn(
            `flex justify-start gap-4 !px-1.5 text-base font-bold hover:bg-transparent`,
            pathname === item.path
              ? 'text-white'
              : 'text-accent-foreground/80 hover:text-white'
          )}
          key={item.label}
          variant='ghost'
          size='sm'
          asChild
        >
          <Link href={item.path}>
            <item.icon size={20} /> {item.label}
          </Link>
        </Button>
      ))}
    </Card>
  )
}
