'use client'

import { signIn } from 'next-auth/react'

export async function logIn() {
  console.log('SIGNING IN')
  await signIn('spotify', { callbackUrl: process.env.NEXTAUTH_URL! })
}
