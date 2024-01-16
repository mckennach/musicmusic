import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STEPZEN_ENDPOINT,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}`
  },
  cache: new InMemoryCache()
})
