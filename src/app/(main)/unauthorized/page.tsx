'use client'

// import { useSession } from 'next-auth/react'
// import { useSpotify } from '@/hooks';
import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function Unauthorized({}) {
  // const data = spotify.getAuthURL();
  // const { data: session, status } = useSession()
  // const data = await fetchRefreshToken();
  return (
    <div className='p-12 flex items-center flex-col justify-center gap-2'>
      <h1 className='text-4xl font-bold'>Unauthorized</h1>
      <Button
        onClick={() =>
          signIn('spotify', {
            callbackUrl: '/'
          })
        }
        className='rounded-full'
      >
        {' '}
        Sign in with Spotify
      </Button>
      <pre>
        <code>{/* {JSON.stringify(data, null, 2)} */}</code>
      </pre>
    </div>
  )
}
