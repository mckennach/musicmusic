import { AuthSession } from '@/types/database.ds'

export async function getAlbum(id: string, session: AuthSession | null) {
  if (session) {
    ;('use server')
    const response = await fetch(
      `${process.env.NEXTAUTH_URL!}/api/spotify/album/${id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: session.user.access_token
        }),
        method: 'POST',
        cache: 'no-store'
      }
    )
    return response.json()
  }
  return null
}
