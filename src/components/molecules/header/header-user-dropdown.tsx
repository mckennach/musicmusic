'use client'
import { sessionAtom } from '@/lib/atoms'
import { useAtom } from 'jotai'
import { ExternalLink } from 'lucide-react'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { UserAvatar } from '../../ui/user-avatar'

export function HeaderUserDropdown({ session }: { session: Session }) {
  const [, setSession] = useAtom(sessionAtom)
  const handleLogout = () => {
    setSession(null)
    signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          src={session?.user?.image ? session?.user?.image : undefined}
          alt='Avatar'
          name={session?.user?.name ? session?.user?.name : 'User'}
          icon='user'
          size='md'
          scale={true}
          className='h-7 w-7 rounded-full'
          tooltipAlign='end'
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' side='bottom' hideWhenDetached={true}>
        <DropdownMenuItem>
          Account
          <DropdownMenuShortcut>
            <ExternalLink size={15} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
