import type { Socket } from 'node:dgram'
import { createSocket } from 'node:dgram'
import { promisify } from 'node:util'
import hexLog from './hexLog'
import Logger from './Logger'

type Callback = (...params: any) => any
type Callbacks = Set<Callback>
type Log = (s: string) => void

export default class UDPSocket {
  private debuggingCallbacks: Callbacks
  private logger: Logger
  private port: number | null
  private socket: Socket | null
  private readonly callbacks: Callbacks

  constructor() {
    this.callbacks = new Set()
    this.debuggingCallbacks = new Set()
    this.logger = new Logger()
    this.port = null
    this.socket = null
  }

  async getSocket() {
    if (!this.socket) {
      const udpSocket: Socket = createSocket(
        {
          reuseAddr: true,
          type: 'udp4',
        },
        (
          buffer: Buffer,
          { address, port }: { address: string; port: number }
        ) => {
          this.logger.debug((log: Log) => {
            log(`${address}:${port} <--UDP(${this.port})`)
            log(hexLog(buffer))
          })

          for (const cb of this.callbacks) {
            cb(address, port, buffer)
          }
        }
      )
        .on('error', (e) => {
          this.logger.debug('UDP ERROR:', e)
        })
        .unref()

      // @ts-ignore
      await promisify(udpSocket.bind).bind(udpSocket)(this.port)
      this.port = udpSocket.address().port
      this.socket = udpSocket
    }

    return this.socket
  }

  async send(
    buffer: Buffer | string,
    address: string,
    port: number,
    debug: boolean
  ) {
    const socket = await this.getSocket()

    if (debug) {
      this.logger._print((log: Log) => {
        log(`${address}:${port} UDP(${this.port})-->`)
        log(hexLog(buffer))
      })
    }

    await promisify(socket.send).bind(socket)(
      buffer,
      // @ts-ignore
      0,
      buffer.length,
      port,
      address
    )
  }

  addCallback(callback: Callback, debug: boolean) {
    this.callbacks.add(callback)

    if (debug) {
      this.debuggingCallbacks.add(callback)
      this.logger.debugEnabled = true
    }
  }

  removeCallback(callback: Callback) {
    this.callbacks.delete(callback)
    this.debuggingCallbacks.delete(callback)
    this.logger.debugEnabled = this.debuggingCallbacks.size > 0
  }
}
