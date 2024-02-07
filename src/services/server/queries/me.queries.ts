'use server'

import {
  AuthSession,
  MyItemsKeys,
  MyItemsPartialResp,
  MyItemsResult
} from '@/types/database.ds'
import { MaxInt } from '@spotify/web-api-ts-sdk'

export async function fetchMyItems<T extends readonly MyItemsKeys[]>(
  session: AuthSession,
  type: T,
  endpoint: string,
  limit = 20 as MaxInt<50>,
  offset = 0 as number,
  fields?: { [key: string]: any }
): Promise<MyItemsResult<T>> {
  const url = `${process.env.NEXTAUTH_URL!}/api/${endpoint}`
  const body = JSON.stringify({
    token: session.user?.access_token,
    type: type[0],
    extra_fields: fields,
    ...fields
  })

  const result: MyItemsPartialResp = {}
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body,
    method: 'POST',
    cache: 'no-store'
  })

  const data = await response.json()
  result[type[0]] = data
  return result as MyItemsResult<T>
}
