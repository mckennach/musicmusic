import { Skeleton } from '@/components/ui/skeleton'

export function LibrarySkeleton() {
  return (
    <div className='flex h-12 w-full items-center justify-start px-2 py-1.5'>
      <div className='flex max-w-full items-center gap-x-3 gap-y-2 truncate'>
        <Skeleton className='h-10 w-10 rounded-sm' />
        <div className='h-full max-w-full space-y-1 truncate text-left'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-2 w-16' />
        </div>
      </div>
    </div>
  )
}
