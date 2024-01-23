import Album from './Album'
import Artist from './Artist'
import AudioFeatures from './AudioFeatures'
import Category from './Category'
import ExternalUrls from './ExternalUrls'
import Image from './Image'
import Paging from './Paging'
import PlayHistory from './PlayHistory'
import Playlist from './Playlist'
import PlaylistTrack from './PlaylistTrack'
import RecommendationParameters from './RecommendationParameters'
import RecommendationsResponse from './RecommendationsResponse'
import RecommendationsSeedObject from './RecommendationsSeedObject'
import RootQuery from './RootQuery'
import TimeRange from './TimeRange'
import TopType from './TopType'
import Track from './Track'
import User from './User'

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: Mutation
  }
`

const typeDefs = [
  SchemaDefinition,
  RootQuery,
  Playlist,
  Image,
  User,
  PlaylistTrack,
  Track,
  Album,
  Artist,
  Paging,
  AudioFeatures,
  PlayHistory,
  Category,
  RecommendationParameters,
  RecommendationsResponse,
  RecommendationsSeedObject,
  ExternalUrls,
  TimeRange,
  TopType
]

export default typeDefs
