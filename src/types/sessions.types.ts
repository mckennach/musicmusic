import { AuthUser } from '@auth/auth-options'
import { DefaultSession } from 'next-auth'

export interface AuthSession extends DefaultSession {
  user: AuthUser
  error: string
}
