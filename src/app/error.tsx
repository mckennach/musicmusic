'use client'

import * as Sentry from '@sentry/nextjs'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
export default function ErrorPage({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to Sentry
    Sentry.captureException(error)
  }, [error])

  return (
    <div className='h-[60vh] w-full flex flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl font-bold'>Something went wrong!</h1>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}
