'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { signIn } from 'next-auth/react'

export function SidebarSignIn() {
  return (
    <div className='flex flex-col items-center justify-start pt-4 w-full h-full'>
      <Card className='w-full bg-tinted-base'>
        <CardHeader>
          <CardTitle>Sign in to Spotify</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() =>
              signIn('spotify', {
                callbackUrl: `${process.env.NEXT_PUBLIC_URL!}/`
              })
            }
            className='rounded-full'
          >
            Sign in to view your library
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
