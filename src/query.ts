import type { QueryOptions as LegacyQueryOptions, QueryResult } from 'gamedig'
// @ts-ignore
import GlobalUdpSocket from './legacy/GlobalUdpSocket.js'
// @ts-ignore
import ValveProtocol from './legacy/ValveProtocol.js'

export default function query({
  attemptTimeout = 10000,
  maxAttempts = 1,
  port = 2456,
  socketTimeout = 2000,
  ...props
}: Omit<
  LegacyQueryOptions,
  'givenPortOnly' | 'requestRules' | 'type'
>): Promise<QueryResult> {
  const core = new ValveProtocol()

  core.udpSocket = new GlobalUdpSocket({
    port: undefined,
  })

  core.options = {
    attemptTimeout,
    maxAttempts,
    port,
    socketTimeout,
    ...props,
  }

  return core.runOnceSafe()
}
