import type {
  QueryResult,
  QueryOptions as LegacyQueryOptions,
  Type as LegacyQueryType,
} from 'gamedig'
// @ts-ignore
import Gamedig from './legacy/Gamedig'

type PromiseQueryResult = Promise<QueryResult>

const {
  query: serverStatus,
}: {
  query: (
    options: Omit<LegacyQueryOptions, 'type'> & {
      type: LegacyQueryType | 'valheim'
    }
  ) => PromiseQueryResult
} = Gamedig

export default function valheimServerStatus(
  host: string,
  port: number = 10011
): PromiseQueryResult {
  return serverStatus({
    givenPortOnly: true,
    type: 'valheim',
    host,
    port,
  })
}
