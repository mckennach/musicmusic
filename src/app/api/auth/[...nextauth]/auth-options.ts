import { Account, AuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt'

// import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyProfile, { refreshAccessToken } from './spotify'

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

// import spotifyApi, { LOGIN_UR } from '@/lib/spotify'

// const refreshAccessToken = async (token: {
//   access_token: string
//   access_token_expires: number
//   refresh_token: string
//   username: string
// }) => {
//   try {
//     // spotifyApi.setAccessToken(token.access_token)
//     // spotifyApi.setRefreshToken(token.refresh_token)

//     // const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
//     // // spotifyApi.refreshaccess_token
//     // console.log(`REFRESH TOKEN IS ${refreshedToken}`)
//     // return {
//     //   ...token,
//     //   access_token: refreshedToken.access_token,
//     //   access_token_expires: Date.now() + refreshedToken.expires_in * 1000, // 1 hour
//     //   refresh_token: refreshedToken.refresh_token ?? token.refresh_token
//     // }
//   } catch (error) {
//     console.warn(error)
//     return {
//       ...token,
//       error: 'Refreshaccess_token'
//     }
//   }
// }

export const authOptions: AuthOptions = {
  providers: [spotifyProfile],
  secret: process.env.NEXTAUTH_SECRET!,
  pages: {
    signIn: '/login'
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
      if (!account) {
        return token
      }

      const updatedToken = {
        ...token,
        access_token: account?.access_token,
        token_type: account?.token_type,
        expires_at: account?.expires_at ?? Date.now() / 1000,
        expires_in: (account?.expires_at ?? 0) - Date.now() / 1000,
        refresh_token: account?.refresh_token,
        scope: account?.scope,
        id: account?.providerAccountId
      }

      if (Date.now() < updatedToken.expires_at) {
        console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...')

        return refreshAccessToken(updatedToken)
      }
      console.log('EXISTING TOKEN IS VALID!')

      return updatedToken

      // if (account && user) {
      //   const expiresAt = account.expires_at ?? 3600
      //   return {
      //     ...token,
      //     access_token: account?.access_token,
      //     token_type: account?.token_type,
      //     expires_at: account?.expires_at ?? Date.now() / 1000,
      //     expires_in: (account?.expires_at ?? 0) - Date.now() / 1000,
      //     refresh_token: account?.refresh_token,
      //     scope: account?.scope,
      //     id: account?.providerAccountId,
      //   }
      // }
      // console.log(token?.access_token_expires);
      // console.log(Date.now());
      // if (Date.now() < token?.access_token_expires) {
      //   console.log('EXISTING TOKEN IS VALID')
      //   return token
      // }

      // console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...')
      // return await refreshAccessToken(token)
    },
    async session({ session, token }: { session: any; token: any }) {
      // console.log(token);
      // Send properties to the client, like an access_token and user id from a provider.

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

      // session.user.access_token = token.access_token
      // session.user.refresh_token = token.refresh_token
      // session.user.username = token.username
      // session.user.id = token.username

      // return session
    }
  },
  debug: true
}
