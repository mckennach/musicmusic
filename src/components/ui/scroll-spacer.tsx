import React, { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const ScrollSpacer = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div className={cn(`scroll-spacer`, className)} ref={ref} {...props} />
})

ScrollSpacer.displayName = 'ScrollSpacer'

export { ScrollSpacer }
