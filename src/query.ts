import type { QueryOptions, QueryResult } from 'gamedig'
import Protocol from './Protocol'
import UDPSocket from './UDPSocket'

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

  return protocol.runOnceSafe({
    attemptTimeout,
    port,
    socketTimeout,
    ...props,
  })
}
