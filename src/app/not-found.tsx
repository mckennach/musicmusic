import logo from '@/assets/logo.svg'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
export default function NotFound() {
  return (
    <main className='h-screen w-screen bg-black flex flex-col items-center justify-center'>
      <div className='container flex flex-col gap-8 items-center justify-center'>
        <Image src={logo} alt='Spotify' width={60} height={60} />

        <div className='text-center flex flex-col gap-3'>
          <h1 className='text-3xl font-bold'>Page not available</h1>
          <p className='text-subdued'>Could not find requested resource</p>
        </div>

        <Button className='rounded-full' asChild>
          <Link href='/'>Return Home</Link>
        </Button>

        <Button asChild variant='link' size='lg' className='font-bold'>
          <Link href='/login'>Login</Link>
        </Button>
      </div>
    </main>
  )
}
