import { Account, AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'

// import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyProfile, { refreshAccessToken } from './spotify-profile'

export type AuthUser = {
  name: string
  email: string
  image: string
  access_token: string
  token_type: string
  expires_at: number
  expires_in: number
  refresh_token: string
  scope: string
  id: string
}

export const authOptions: AuthOptions = {
  providers: [spotifyProfile],
  secret: process.env.NEXTAUTH_SECRET!,
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/'
  },
  session: {
    maxAge: 60 * 60 // 1hr
  },
  callbacks: {
    async jwt({
      token,
      account,
      user
    }: {
      token: JWT
      account: Account | null
      user: any
    }) {
      if (account && user) {
        console.log('RETURNING TOKEN WITH ACCOUNT AND USER')
        const expiresAt = account.expires_at ?? 3600
        return {
          ...token,
          access_token: account?.access_token,
          token_type: account?.token_type,
          expires_at: expiresAt * 1000,
          expires_in: (account?.expires_at ?? 0) - Date.now() / 1000,
          refresh_token: account?.refresh_token,
          scope: account?.scope,
          id: account?.providerAccountId
        }
      }

      if (Date.now() < (token as AuthUser).expires_at) {
        return token
      }

      console.log('REFRESHING TOKEN')
      return await refreshAccessToken(token as AuthUser)
    },
    async session({ session, token }: { session: any; token: any }) {
      const user: AuthUser = {
        ...session.user,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: token.expires_at,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        scope: token.scope,
        id: token.id
      }
      session.user = user
      session.error = token.error
      return session
    }
  }
}
