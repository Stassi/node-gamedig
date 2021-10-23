import type { QueryOptions, QueryResult } from 'gamedig'
import UDPSocket from './UDPSocket'
// @ts-ignore
import ValveProtocol from './legacy/ValveProtocol.js'

export default function query({
  attemptTimeout = 10000,
  port = 2456,
  socketTimeout = 2000,
  ...props
}: Omit<
  QueryOptions,
  'givenPortOnly' | 'maxAttempts' | 'requestRules' | 'type'
>): Promise<QueryResult> {
  const core = new ValveProtocol()

  core.udpSocket = new UDPSocket()

  core.options = {
    attemptTimeout,
    port,
    socketTimeout,
    ...props,
  }

  return core.runOnceSafe()
}
