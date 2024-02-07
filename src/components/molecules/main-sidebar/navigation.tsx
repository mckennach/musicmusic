'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useAtom } from 'jotai'

import { sideBarLeftCollapsedAtom } from '@/lib/atoms'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SearchActiveIcon } from '@/components/ui/search-icon'
import { LucideIcon, Search } from 'lucide-react'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { IconType } from 'react-icons/lib'
interface NavItem {
  label: string
  icon: LucideIcon | IconType
  activeIcon: LucideIcon | IconType
  path: string
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    icon: GoHome,
    activeIcon: GoHomeFill,
    path: '/'
  },
  {
    label: 'Search',
    icon: Search,
    activeIcon: SearchActiveIcon,
    path: '/search'
  }
]

export function SidebarNav() {
  const pathname = usePathname()

  const [sideBarLeftCollapsed, setSidebarLeftCollaposed] = useAtom(
    sideBarLeftCollapsedAtom
  )

  return (
    <Card
      className={cn(
        'flex w-full flex-col border-none px-3 py-2',
        sideBarLeftCollapsed && `justify-center p-1.5`
      )}
    >
      {navItems.map((item) => (
        <Button
          className={cn(
            'h-10 text-base/80 !hover:bg-transparent flex gap-5 !px-1.5 font-bold transition-all duration-300 ease-in-out',
            '!hover:after:bg-transparent hover:after:opacity-0',
            pathname === item.path
              ? 'text-white'
              : 'text-[#b3b3b3]/75 hover:text-white',
            sideBarLeftCollapsed ? 'justify-center' : 'justify-start'
          )}
          key={item.label}
          variant='ghost'
          size='sm'
          asChild
        >
          <Link href={item.path}>
            {pathname === item.path ? (
              <item.activeIcon size={20} color={'white'} />
            ) : (
              <item.icon size={20} color={'#b3b3b3'} />
            )}
            {!sideBarLeftCollapsed && item.label}
          </Link>
        </Button>
      ))}
    </Card>
  )
}
