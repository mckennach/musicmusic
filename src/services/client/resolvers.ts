import { gql } from '@apollo/client'

export const GET_ME = gql(`
  query GetMe {
    me @rest(type: "Me", path: "me/") {
      id
      display_name
      images @type(name: "Image") {
        url
        width
        height
      }
    }
  }
`)

const GET_PLAYLIST = gql(`
  query Playlist($playlistId: String!, $userId: String!) {
    playlist(id: $playlistId, userId: $userId) {
      id
      images {
        width
        url
        height
      }
      name
    }
  }
`)
