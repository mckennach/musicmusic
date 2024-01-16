import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import React from 'react'

type SliderProps = React.ComponentProps<typeof Slider>
// interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProgressBar = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, ...props }, ref) => {
    return <Slider max={100} step={1} className={cn(className)} {...props} />
  }
)

ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }
