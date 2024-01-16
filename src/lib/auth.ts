import spotifyApi, { LOGIN_URL } from '@/lib/spotify'
import { AuthOptions, getServerSession } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import SpotifyProvider from 'next-auth/providers/spotify'

export interface TokenProps extends JWT {
  accessToken: string
  accessTokenExpires: number
  refreshToken: string
  username: string
}

const refreshAccessToken = async (token: TokenProps) => {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    // spotifyApi.refreshAccessToken
    console.log(`REFRESH TOKEN IS ${refreshedToken}`)
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // 1 hour
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    }
  } catch (error) {
    console.warn(error)
    return {
      ...token,
      error: 'RefreshAccessToken'
    }
  }
}

export const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: LOGIN_URL
    })
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, token }: { session: any; token: any }) {
      // console.log(token);
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    },
    async jwt({ token, account, user }) {
      const theToken = token as TokenProps

      if (account && user) {
        const expiresAt = account.expires_at ?? 3600
        if (!account.access_token || !account.refresh_token) return token
        const newToken: TokenProps = {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: expiresAt * 1000
        }

        return newToken
      }

      if (
        theToken?.accessTokenExpires &&
        Date.now() < theToken?.accessTokenExpires
      ) {
        console.log('EXISTING TOKEN IS VALID')
        return token
      }
      // Persist the OAuth access_token and or the user id to the token right after signin
      return await refreshAccessToken(theToken)
    }
  },
  debug: true
}

export const serverSession = async (options: AuthOptions) => {
  const session = await getServerSession(options)
  return session
}
