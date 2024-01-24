import { ItemType, Limit, Offset, TimeRange } from './database.ds'

export interface UserTopItemParams {
  type: ItemType
  time_range: TimeRange
  limit?: Limit
  offset?: Offset
}
