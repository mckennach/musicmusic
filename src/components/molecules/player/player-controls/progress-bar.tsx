import React from 'react'

import { cn } from '@/lib/utils'

import { Slider } from '@/components/ui/slider'

type SliderProps = React.ComponentProps<typeof Slider>
// interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProgressBar = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, ...props }, ref) => {
    return <Slider max={100} step={1} className={cn(className)} {...props} />
  }
)

ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }
