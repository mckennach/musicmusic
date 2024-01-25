'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { Button, ButtonProps } from '@/components/ui/button'

interface RefreshButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const RefreshButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ ...props }, ref) => {
    const router = useRouter()
    return (
      <Button
        ref={ref}
        {...props}
        variant='link'
        onClick={() => router.refresh()}
      >
        Refresh
      </Button>
    )
  }
)

RefreshButton.displayName = 'RefreshButton'

export { RefreshButton }
