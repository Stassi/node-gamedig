import type { QueryOptions, QueryResult } from 'gamedig'
import UDPSocket from './UDPSocket'
// @ts-ignore
import Protocol from './legacy/Protocol.js'

export default function query({
  attemptTimeout = 10000,
  port = 2456,
  socketTimeout = 2000,
  ...props
}: Omit<
  QueryOptions,
  'givenPortOnly' | 'maxAttempts' | 'requestRules' | 'type'
>): Promise<QueryResult> {
  const protocol = new Protocol()

  protocol.udpSocket = new UDPSocket()

  protocol.options = {
    attemptTimeout,
    port,
    socketTimeout,
    ...props,
  }

  return protocol.runOnceSafe()
}
