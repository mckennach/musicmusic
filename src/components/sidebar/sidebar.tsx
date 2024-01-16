import { cn } from '@/lib/utils'

export function Sidebar({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className?: string
  props?: any
}) {
  return (
    <aside
      className={cn(
        `flex h-full flex-col items-center justify-between gap-2 overflow-hidden`,
        className
      )}
    >
      {children}
    </aside>
  )
}
