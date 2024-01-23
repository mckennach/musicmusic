'use client'

import { sideBarLeftCollapsedAtom } from '@/lib/atoms'
import { LibraryItem } from '@/types'
import { useAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
// Components
import { ItemTitle } from '@/components/ui/item-title'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import Link from 'next/link'
import { Button } from '../../../../ui/button'
import Icon from '../../../../ui/icon'

interface LibraryNavItemProps {
  name: string
  href: string
  imageSrc?: string
  label: string
  isActive?: boolean
}

export function LibraryItem({
  name,
  id,
  type,
  href,
  imageSrc,
  label,
  icon,
  pinned
}: LibraryItem) {
  const pathname = usePathname()
  const [background, setBackground] = useState('bg-transparent')
  const [isActive, setIsActive] = useState(false)
  useEffect(() => {
    setIsActive(pathname === href)
  }, [pathname, href])
  const [sideBarLeftCollapsed] = useAtom(sideBarLeftCollapsedAtom)

  if (sideBarLeftCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            // container="inverted"
            className={cn(
              `w-full flex-1 overflow-hidden rounded-sm`,
              'justify-center px-0 py-1.5',
              isActive
              // ? 'after:bg-tinted-higlight bg-tinted-base active:bg-tinted-press text-highlight-foreground'
              // : ''
            )}
            isActive={isActive}
            variant='ghost'
            size='sm'
            asChild
          >
            <Link href={href}>
              <div className='flex max-w-full items-center gap-x-3 gap-y-2 truncate'>
                <div className='relative'>
                  <Avatar
                    className={cn(
                      'h-10 w-10',
                      type === 'artist' ? `rounded-full` : 'rounded-sm'
                    )}
                  >
                    <AvatarImage
                      className={cn(
                        type === 'artist' ? `rounded-full` : 'rounded-sm'
                      )}
                      src={imageSrc ? imageSrc : undefined}
                      alt={name ? `${name} Cover` : 'Cover'}
                    />
                    <AvatarFallback
                      className={cn(
                        type === 'artist' ? `rounded-full` : 'rounded-sm',
                        type === 'tracks' &&
                          'bg-gradient-to-br from-[#7f3ffb] from-20% to-[#ffffff] to-100%',
                        type === 'episodes' && 'bg-[#056952]'
                      )}
                    >
                      <Icon
                        name={icon}
                        size={20}
                        className='shadow-sm'
                        fill={
                          type === 'tracks' || type === 'episodes'
                            ? type === 'tracks'
                              ? 'white'
                              : '#1ed760'
                            : ''
                        }
                        color={type === 'episodes' ? '#1ed760' : 'white'}
                      />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side='right'>
          <ItemTitle
            name={name}
            label={label}
            icon={pinned ? 'pin' : undefined}
          />
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Button
      // container="inverted"
      className={cn(
        `w-full flex-1 justify-start overflow-hidden rounded-sm p-2`,
        sideBarLeftCollapsed && 'justify-center p-1.5',
        isActive
        // ? 'after:bg-tinted-higlight bg-tinted-base active:bg-tinted-press text-highlight-foreground'
        // : ''
      )}
      isActive={isActive}
      variant='ghost'
      size='sm'
      asChild
    >
      <Link href={href}>
        <div className='flex max-w-full items-center gap-x-3 gap-y-2 truncate relative z-20'>
          <div className='relative'>
            <Avatar
              className={cn(
                `h-12 w-12`,
                sideBarLeftCollapsed && 'h-10 w-10',
                type === 'artist' ? `rounded-full` : 'rounded-sm'
              )}
            >
              <AvatarImage
                className={cn(
                  type === 'artist' ? `rounded-full` : 'rounded-sm'
                )}
                src={imageSrc ? imageSrc : undefined}
                alt={name ? `${name} Cover` : 'Cover'}
              />
              <AvatarFallback
                className={cn(
                  type === 'artist' ? `rounded-full` : 'rounded-sm',
                  type === 'tracks' &&
                    'bg-gradient-to-br from-[#7f3ffb] from-20% to-[#ffffff] to-100%',
                  type === 'episodes' && 'bg-[#056952]'
                )}
              >
                <Icon
                  name={icon}
                  size={20}
                  className='shadow-sm'
                  fill={
                    type === 'tracks' || type === 'episodes'
                      ? type === 'tracks'
                        ? 'white'
                        : '#1ed760'
                      : ''
                  }
                  color={type === 'episodes' ? '#1ed760' : 'white'}
                />
              </AvatarFallback>
            </Avatar>
          </div>
          {!sideBarLeftCollapsed && (
            <ItemTitle
              name={name}
              label={label}
              icon={pinned ? 'pin' : undefined}
            />
            // <div className='h-full max-w-full space-y-0.5 truncate text-left'>
            //   <p className='truncate text-base font-normal text-foreground'>
            //     {name}
            //   </p>
            //   <span className='flex items-center gap-1 truncate text-xs font-medium text-subdued'>
            //     {pinned && (
            //       <Icon
            //         name='pin'
            //         size={10}
            //         className='rotate-45 text-spotify'
            //         fill='#1ed760'
            //       />
            //     )}
            //     {label}
            //   </span>
            // </div>
          )}
        </div>
      </Link>
    </Button>
  )
}
