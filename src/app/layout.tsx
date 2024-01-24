// import { Toaster } from '@/components/ui/toaster'
import {
  DatabaseProvider,
  GsapProvider,
  JotaiProvider,
  SessionProvider,
  ThemeProvider
} from '@/context'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { getCsrfToken } from 'next-auth/react'

import { Lato } from 'next/font/google'

import { cn } from '@/lib/utils'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import '@/styles/globals.output.css'

import { authOptions } from '../lib/auth/auth-options'

import { AuthSession } from '@/types/database.ds'

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

const fetchInitalData = async (session: AuthSession | null) => {
  if (session) {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL!}/api/spotify/init`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: session.user?.access_token
        }),
        method: 'POST',
        next: {
          revalidate: 3600
        }
      }
    )
    return response.json()
  }
  return null
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const token = await getCsrfToken()
  const session: AuthSession | null = await getServerSession(authOptions)
  const initialData = await fetchInitalData(session as AuthSession)
  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <SessionProvider session={session}>
        <JotaiProvider>
          <DatabaseProvider session={session} initialData={initialData}>
            <body
              className={cn(
                'bg-background font-sans text-foreground antialiased',
                fontSans.variable
              )}
            >
              <TooltipProvider delayDuration={0}>
                <GsapProvider>
                  <ThemeProvider
                    attribute='class'
                    defaultTheme='dark'
                    enableSystem={false}
                  >
                    {children}
                    <Toaster />
                  </ThemeProvider>
                </GsapProvider>
              </TooltipProvider>
            </body>
          </DatabaseProvider>
        </JotaiProvider>
      </SessionProvider>
    </html>
  )
}
