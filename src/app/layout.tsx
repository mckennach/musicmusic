// import { Toaster } from '@/components/ui/toaster'
import { Error } from '@/components/ui/error'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Suspense } from 'react'
import {
  DatabaseProvider,
  JotaiProvider,
  SessionProvider,
  ThemeProvider
} from '@/providers'
import { AuthSession } from '@/types/sessions.types'
import { authOptions } from '@auth/auth-options'
import '@styles/globals.css'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { getCsrfToken } from 'next-auth/react'
import { Lato } from 'next/font/google'

const fontSans = Lato({
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-sans'
})
export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

const fetchCurrentUser = async (session: AuthSession) => {
  const resp = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.access_token}`
    }
  })
  const data = await resp.json()
  return data
}

const fetchLibrary = async (session: AuthSession) => {
  // return null;
  const resp = await fetch(`${process.env.NEXTAUTH_URL!}api/spotify/library`, {
    method: 'POST',
    body: JSON.stringify({
      token: session?.user?.access_token
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.user?.access_token}`
    }
  })
  const data = await resp.json()
  return data
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const token = await getCsrfToken()
  const session: AuthSession | null = await getServerSession(authOptions)
  const user = session && (await fetchCurrentUser(session))

  return (
    <html lang='en' suppressHydrationWarning>
      <SessionProvider session={session}>
        <JotaiProvider>
          <DatabaseProvider session={session} user={user}>
            <body
              className={cn(
                'bg-background font-sans text-foreground antialiased',
                fontSans.variable
              )}
            >
              <ThemeProvider
                attribute='class'
                defaultTheme='dark'
                enableSystem={false}
              >
                <TooltipProvider delayDuration={0}>
                  {children}
                  <Error />
                  <Toaster />
                </TooltipProvider>
              </ThemeProvider>
            </body>
          </DatabaseProvider>
        </JotaiProvider>
      </SessionProvider>
    </html>
  )
}
