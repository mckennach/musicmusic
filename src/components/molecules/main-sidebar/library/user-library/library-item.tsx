'use client'

import { sideBarLeftCollapsedAtom } from '@/lib/atoms'
import { LibraryItem } from '@/types/database.ds'
import { useAtom } from 'jotai'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
// Components
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ItemTitle } from '@/components/ui/item-title'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button, buttonVariants } from '../../../../ui/button'
import Icon from '../../../../ui/icon'
import { CoverImage } from '@/components/ui/cover-image'

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
    return (
      <Tooltip>
        <TooltipTrigger asChild>
            <Link href={href} className={cn(buttonVariants({ size: 'sm', variant: 'ghost', className: cn(
              'library-item',
              'overflow-hidden rounded-sm',
              // 'w-full flex-1 overflow-hidden rounded-sm',
              // sideBarLeftCollapsed ? 'justify-center px-0 py-1.5' : 'w-full flex-1 overflow-hidden rounded-sm justify-start p-2',
              sideBarLeftCollapsed ? 'justify-center flex-1 p-1.5 h-full w-full' : 'w-full flex-1 justify-start p-2',
              isActive && 'after:bg-tinted-higlight after:opacity-100 bg-tinted-base active:bg-tinted-press text-highlight-foreground'
            ) }))}>
              <div className={cn(
                // 'flex max-w-full items-center gap-x-3 gap-y-2 truncate',
                'flex gap-x-3 gap-y-2 flex-row items-center p-0 truncate w-full'
              )}>
                  <CoverImage
                    className={cn('overflow-hidden shadow-md  w-full h-full',
                      sideBarLeftCollapsed ? 'max-w-12' : 'max-w-12 min-h-12',
                      type === 'artist' ? `rounded-full` : 'rounded-sm'
                    )}
                    src={imageSrc ? imageSrc : undefined}
                    alt={name ? `${name} Cover` : 'Cover'}
                    icon={icon}
                    fallbackClassName={cn(
                      type === 'tracks' ? 'bg-gradient-to-br from-[#7f3ffb] from-20% to-[#ffffff] to-100%' : '',
                      type === 'episodes' ? 'bg-[#056952]' : ''
                    )}
                    iconClassName={cn(
                      'shadow-sm w-2/5 h-2/5',
                      type === 'tracks' ? 'text-white fill-white' : '',
                      type === 'episodes' ? 'text-[#1ed760] fill-[#1ed760]' : ''
                    )}
                  />
                  {!sideBarLeftCollapsed && (
                    <ItemTitle
                      name={name}
                      label={label}
                      icon={pinned ? 'pin' : undefined}
                      className='w-full truncate bg-transparent'
                    />
                  )}
                  
                  {/* <Avatar
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
                  </Avatar> */}
                
              </div>
            </Link>
        </TooltipTrigger>
        <TooltipContent side='right' hidden={!sideBarLeftCollapsed}>
          <ItemTitle
            name={name}
            label={label}
            icon={pinned ? 'pin' : undefined}
          />
        </TooltipContent>
      </Tooltip>
    )
  

  return (
      <Link href={href} className={cn(buttonVariants({ size: 'sm', variant: 'ghost', className: cn(
              'library-item',
              `w-full flex-1 overflow-hidden rounded-sm justify-start p-2`,
              isActive && 'after:bg-tinted-higlight after:opacity-100 bg-tinted-base active:bg-tinted-press text-highlight-foreground'
            ) }))}>
      
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
          )}
        </div>
      </Link>
    
  )
}
