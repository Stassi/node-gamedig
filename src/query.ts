import type { QueryOptions, QueryResult } from 'gamedig'
import Protocol from './Protocol'

export default function query({
  attemptTimeout = 10000,
  port = 2456,
  socketTimeout = 2000,
  ...props
}: Omit<
  QueryOptions,
  'givenPortOnly' | 'maxAttempts' | 'requestRules' | 'type'
>): Promise<QueryResult> {
  return new Protocol().runOnceSafe({
    attemptTimeout,
    port,
    socketTimeout,
    ...props,
  })
}
