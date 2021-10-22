import type { QueryResult } from 'gamedig'
import query from './query'

export default function valheimServerStatus(
  host: string,
  port: number = 10011
): Promise<QueryResult> {
  return query({
    host,
    port,
  })
}
