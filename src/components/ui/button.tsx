import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium  disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover border-destructive-border',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          "relative z-20 overflow-hidden after:content=[''] after:absolute after:inset-0 after:left-0 after:top-0 after:rounded-md after:opacity-0 after:transition-opacity after:bg-elevated-base after:z-[-1] hover:after:opacity-100 active:after:bg-press",
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      },
      container: {
        default: '',
        accent: 'accent',
        inverted: 'inverted',
        announcement: 'announcement'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      container: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  scale?: boolean
  container?: 'default' | 'accent' | 'inverted' | 'announcement'
  isActive?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      container,
      isActive,
      scale = false,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          buttonVariants({ container, variant, size, className }),
          isActive && 'active',
          scale &&
            'scale-100 transform transition-all duration-75 hover:scale-105'
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
