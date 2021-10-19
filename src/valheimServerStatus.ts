import type {
  QueryResult,
  QueryOptions as LegacyQueryOptions,
  Type as LegacyQueryType,
} from 'gamedig'
// @ts-ignore
import gamedigLegacy from '../lib'

type PromiseQueryResult = Promise<QueryResult>
type Gamedig = {
  query: (
    options: Omit<LegacyQueryOptions, 'type'> & {
      type: LegacyQueryType | 'valheim'
    }
  ) => PromiseQueryResult
}

const { query: serverStatus }: Gamedig = gamedigLegacy

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
