import type {
  QueryResult,
  QueryOptions as LegacyQueryOptions,
  Type as LegacyQueryType,
} from 'gamedig'
// @ts-ignore
import QueryRunner from './legacy/QueryRunner.js'

type PromiseQueryResult = Promise<QueryResult>

function serverStatus(
  userOptions: Omit<LegacyQueryOptions, 'type'> & {
    type: LegacyQueryType | 'valheim'
  }
): PromiseQueryResult {
  return new QueryRunner(undefined).run(userOptions)
}

export default function valheimServerStatus(
  host: string,
  port: number = 10011
): PromiseQueryResult {
  return serverStatus({
    host,
    port,
    givenPortOnly: true,
    type: 'valheim',
  })
}
