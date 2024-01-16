import { AuthUser } from '@auth/auth-options'
import { DefaultSession } from 'next-auth'

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
