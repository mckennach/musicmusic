import { cn } from '@/lib/utils'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import { forwardRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import Icon from './icon'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
interface UserAvatarProps {
  src?: string
  alt?: string
  name: string
  icon: keyof typeof dynamicIconImports
  size?: 'sm' | 'md' | 'lg'
  scale: boolean
  fallbackClassName?: string
  className?: string
}

const UserAvatar = forwardRef<HTMLSpanElement, UserAvatarProps>(
  (
    {
      src,
      alt,
      name,
      icon,
      size,
      scale = false,
      fallbackClassName,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar
            ref={ref}
            {...props}
            className={cn(
              `h-7 w-7 rounded-full border-2 border-card`,
              size && size === 'sm' && `h-6 w-6`,
              size && size === 'md' && `h-7 w-7`,
              size && size === 'lg' && `h-8 w-8`,
              scale &&
                `scale-100 transform transition-all duration-75 hover:scale-105`,
              className
            )}
          >
            <AvatarImage src={src} alt={alt ? alt : 'Avatar'} />
            <AvatarFallback
              className={cn(`bg-primary text-xs`, fallbackClassName)}
            >
              <Icon name={icon} size={15} />
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>{name}</TooltipContent>
      </Tooltip>
    )
  }
)

UserAvatar.displayName = 'UserAvatar'

export { UserAvatar }
