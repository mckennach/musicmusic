import { DefaultSession, DefaultUser } from 'next-auth'

// export interface AuthUser extends DefaultUser {
//   access_token?: string

//   username?: string
//   expires_at: number
//   refresh_token?: string

//   id: string
// }

export interface AuthUser extends DefaultUser {
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
// export interface AuthSessionProps extends Session {
//   data: {
//     expires: string
//     user: {
//       name: string
//       email: string
//       image: string
//       accessToken: string
//       refreshToken: string
//       username: string
//     }
//     accessToken: string
//     refreshToken: string
//     accessTokenExpires: number
//   }
//   expires: string
//   user: {
//     name: string
//     email: string
//     image: string
//     accessToken: string
//     refreshToken: string
//     username: string
//   }
// }

export interface AuthSession extends DefaultSession {
  user: AuthUser
  error: string
}

export interface TokenProps {
  name: string
  email: string
  picture: string
  sub: string
  accessToken: string
  refreshToken: string
  username: string
  accessTokenExpires: number
  iat: number
  exp: number
  jti: string
}
