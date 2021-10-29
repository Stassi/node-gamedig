// @ts-nocheck
import type { QueryOptions, QueryResult } from 'gamedig'
import createTimeout from './createTimeout'
import { EventEmitter } from 'node:events'
import DNSResolver from './DNSResolver'
import Logger from './Logger'
import Players from './Players'
import Reader from './Reader'
import UDPSocket from './UDPSocket'

let uid = 0

class Core extends EventEmitter {
  private readonly udpSocket: UDPSocket

  constructor() {
    super()
    this.encoding = 'utf8'
    this.byteorder = 'le'
    this.delimiter = '\0'
    this.srvRecord = null
    this.abortedPromise = null
    this.logger = new Logger()
    this.dnsResolver = new DNSResolver(this.logger)
    this.options = null
    this.shortestRTT = 0
    this.usedTcp = false
    this.udpSocket = new UDPSocket()
  }

  // Runs a single attempt with a timeout and cleans up afterward
  async runOnceSafe(
    options: Omit<
      QueryOptions,
      'givenPortOnly' | 'maxAttempts' | 'requestRules' | 'type'
    >
  ): Promise<QueryResult> {
    this.options = options

    if (this.options.debug) {
      this.logger.debugEnabled = true
    }
    this.logger.prefix = 'Q#' + uid++

    this.logger.debug('Starting')
    this.logger.debug('Protocol: ' + this.constructor.name)
    this.logger.debug('Options:', this.options)

    let abortCall = null
    this.abortedPromise = new Promise((resolve, reject) => {
      abortCall = () =>
        reject(
          new Error('Query is finished -- cancelling outstanding promises')
        )
    }).catch(() => {
      // Make sure that if this promise isn't attached to, it doesn't throw a unhandled promise rejection
    })

    let timeout
    try {
      const promise = this.runOnce()
      timeout = createTimeout(this.options.attemptTimeout, 'Attempt')
      const result = await Promise.race([promise, timeout])
      this.logger.debug('Query was successful')
      return result
    } catch (e) {
      this.logger.debug('Query failed with error', e)
      throw e
    } finally {
      timeout && timeout.cancel()
      try {
        abortCall()
      } catch (e) {
        this.logger.debug('Error during abort cleanup: ' + e.stack)
      }
    }
  }

  async runOnce() {
    const options = this.options
    if ('host' in options && !('address' in options)) {
      const resolved = await this.dnsResolver.resolve(options.host)
      options.address = resolved.address
      if (resolved.port) options.port = resolved.port
    }

    const state = {
      bots: new Players(),
      map: '',
      maxplayers: 0,
      name: '',
      password: false,
      players: new Players(),
      raw: {},
    }

    await this.run(state)

    // because lots of servers prefix with spaces to try to appear first
    state.name = (state.name || '').trim()

    if (!('connect' in state)) {
      state.connect =
        '' +
        (state.gameHost || this.options.host || this.options.address) +
        ':' +
        (state.gamePort || this.options.port)
    }
    state.ping = this.shortestRTT
    delete state.gameHost
    delete state.gamePort

    this.logger.debug((log) => {
      log('Size of players array: ' + state.players.length)
      log('Size of bots array: ' + state.bots.length)
    })

    return state
  }

  async run(state) {}

  // Param can be a time in ms, or a promise (which will be timed)
  registerRtt(param) {
    if (param.then) {
      const start = Date.now()
      param
        .then(() => {
          const end = Date.now()
          const rtt = end - start
          this.registerRtt(rtt)
        })
        .catch(() => {})
    } else {
      this.debugLog('Registered RTT: ' + param + 'ms')
      if (this.shortestRTT === 0 || param < this.shortestRTT) {
        this.shortestRTT = param
      }
    }
  }

  reader(buffer): Reader {
    return new Reader(this, buffer)
  }

  assertValidPort(port) {
    if (!port) {
      throw new Error(
        'Could not determine port to query. Did you provide a port?'
      )
    }
    if (port < 1 || port > 65535) {
      throw new Error('Invalid tcp/ip port: ' + port)
    }
  }

  async udpSend<T>(
    buffer: Buffer | string,
    onPacket: ((b: Buffer) => T) | undefined,
    onTimeout: (() => T) | undefined
  ): Promise<T> {
    const address = this.options.address
    const port = this.options.port
    this.assertValidPort(port)

    if (typeof buffer === 'string') buffer = Buffer.from(buffer, 'binary')

    await this.udpSocket.send(buffer, address, port, this.options.debug)

    if (!onPacket && !onTimeout) {
      return null
    }

    let socketCallback
    let timeout
    try {
      const promise = new Promise((resolve, reject) => {
        const start = Date.now()
        let end = null
        socketCallback = (fromAddress, fromPort, buffer) => {
          try {
            if (fromAddress !== address) return
            if (fromPort !== port) return
            if (end === null) {
              end = Date.now()
              const rtt = end - start
              this.registerRtt(rtt)
            }
            const result = onPacket(buffer)
            if (result !== undefined) {
              this.debugLog('UDP send finished by callback')
              resolve(result)
            }
          } catch (e) {
            reject(e)
          }
        }
        this.udpSocket.addCallback(socketCallback, this.options.debug)
      })
      timeout = createTimeout(this.options.socketTimeout, 'UDP')
      const wrappedTimeout = new Promise((resolve, reject) => {
        timeout.catch((e) => {
          this.debugLog('UDP timeout detected')
          if (onTimeout) {
            try {
              const result = onTimeout()
              if (result !== undefined) {
                this.debugLog('UDP timeout resolved by callback')
                resolve(result)
                return
              }
            } catch (e) {
              reject(e)
            }
          }
          reject(e)
        })
      })
      return await Promise.race([promise, wrappedTimeout, this.abortedPromise])
    } finally {
      timeout && timeout.cancel()
      socketCallback && this.udpSocket.removeCallback(socketCallback)
    }
  }

  /** @deprecated */
  debugLog(...args): void {
    this.logger.debug(...args)
  }
}

export default class Protocol extends Core {
  options: Omit<
    QueryOptions,
    'givenPortOnly' | 'maxAttempts' | 'requestRules' | 'type'
  >
  private _challenge: number | string

  constructor() {
    super()

    this._challenge = ''
  }

  async run(state) {
    if (!this.options.port) this.options.port = 27015
    await this.queryInfo(state)
    await this.queryPlayers(state)
    await this.queryRules(state)
    await this.cleanup(state)
  }

  async queryInfo(state) {
    this.debugLog('Requesting info ...')
    const b = await this.sendPacket(0x54, 'Source Engine Query\0', 0x49, false)

    const reader = this.reader(b)

    state.raw.protocol = reader.uint(1)
    state.name = reader.string()
    state.map = reader.string()
    state.raw.folder = reader.string()
    state.raw.game = reader.string()
    state.raw.appId = reader.uint(2)
    state.raw.numplayers = reader.uint(1)
    state.maxplayers = reader.uint(1)
    state.raw.numbots = reader.uint(1)
    state.raw.listentype = reader.uint(1)
    state.raw.environment = reader.uint(1)
    state.raw.listentype = String.fromCharCode(state.raw.listentype)
    state.raw.environment = String.fromCharCode(state.raw.environment)
    state.password = !!reader.uint(1)
    state.raw.secure = reader.uint(1)
    state.raw.version = reader.string()
    const extraFlag = reader.uint(1)
    if (extraFlag & 0x80) state.gamePort = reader.uint(2)
    if (extraFlag & 0x10) state.raw.steamid = reader.uint(8).toString()
    if (extraFlag & 0x40) {
      state.raw.sourcetvport = reader.uint(2)
      state.raw.sourcetvname = reader.string()
    }
    if (extraFlag & 0x20) state.raw.tags = reader.string().split(',')
    if (extraFlag & 0x01) {
      const gameId = reader.uint(8)
      const betterAppId = gameId.getLowBitsUnsigned() & 0xffffff
      if (betterAppId) {
        state.raw.appId = betterAppId
      }
    }
  }

  async queryPlayers(state) {
    state.raw.players = []

    this.debugLog('Requesting player list ...')
    const b = await this.sendPacket(0x55, null, 0x44, true)

    if (b === null) return

    const reader = this.reader(b)
    const num = reader.uint(1)
    for (let i = 0; i < num; i++) {
      reader.skip(1)
      const name = reader.string()
      const score = reader.int(4)
      const time = reader.float()

      this.debugLog('Found player: ' + name + ' ' + score + ' ' + time)

      // connecting players don't count as players.
      if (!name) continue

      state.raw.players.push({
        name: name,
        score: score,
        time: time,
      })
    }
  }

  async queryRules(state) {
    if (!this.options.requestRules) {
      return
    }

    const rules = {}
    state.raw.rules = rules
    this.debugLog('Requesting rules ...')
    const b = await this.sendPacket(0x56, null, 0x45, true)
    if (b === null) {
      // timed out - the server probably has rules disabled
      return
    }
    const reader = this.reader(b)
    const num = reader.uint(2)
    for (let i = 0; i < num; i++) {
      const key = reader.string()
      rules[key] = reader.string()
    }
  }

  async cleanup(state) {
    // Organize players / hidden players into player / bot arrays
    const botProbability = (p) => {
      if (p.time === -1) return Number.MAX_VALUE
      return p.time
    }
    const sortedPlayers = state.raw.players.sort((a, b) => {
      return botProbability(a) - botProbability(b)
    })
    delete state.raw.players
    const numBots = state.raw.numbots
    const numPlayers = state.raw.numplayers - numBots
    while (state.bots.length < numBots) {
      if (sortedPlayers.length) state.bots.push(sortedPlayers.pop())
      else state.bots.push({})
    }
    while (state.players.length < numPlayers || sortedPlayers.length) {
      if (sortedPlayers.length) state.players.push(sortedPlayers.pop())
      else state.players.push({})
    }
  }

  // Sends a request packet and returns only the response type expected
  async sendPacket(
    type: number,
    payload: (string | Buffer) | null,
    expect: number,
    allowTimeout: boolean | undefined
  ): Promise<Buffer | null> {
    for (let keyRetry = 0; keyRetry < 3; keyRetry++) {
      let receivedNewChallengeKey = false
      const response = await this.sendPacketRaw(
        type,
        payload,
        (payload) => {
          const reader = this.reader(payload)
          const type = reader.uint(1)
          this.debugLog(
            () =>
              'Received 0x' +
              type.toString(16) +
              ' expected 0x' +
              expect.toString(16)
          )
          if (type === 0x41) {
            const key: number = reader.uint(4)
            if (this._challenge !== key) {
              this.debugLog('Received new challenge key: 0x' + key.toString(16))
              this._challenge = key
              receivedNewChallengeKey = true
            }
          }
          if (type === expect) {
            return reader.rest()
          } else if (receivedNewChallengeKey) {
            return null
          }
        },
        () => {
          if (allowTimeout) return null
        }
      )
      if (!receivedNewChallengeKey) {
        return response
      }
    }
    throw new Error('Received too many challenge key responses')
  }

  // Sends a request packet and assembles partial responses
  async sendPacketRaw(
    type: number,
    payload: (string | Buffer) | null,
    onResponse: (b: Buffer) => any,
    onTimeout: () => any
  ) {
    const challengeAtBeginning = type === 0x55 || type === 0x56
    const challengeAtEnd = type === 0x54 && !!this._challenge

    if (typeof payload === 'string') payload = Buffer.from(payload, 'binary')

    const b = Buffer.alloc(
      5 +
        (challengeAtBeginning ? 4 : 0) +
        (challengeAtEnd ? 4 : 0) +
        (payload ? payload.length : 0)
    )
    let offset = 0

    let challenge = this._challenge
    if (!challenge) challenge = 0xffffffff

    b.writeInt32LE(-1, offset)
    offset += 4

    b.writeUInt8(type, offset)
    offset += 1

    if (challengeAtBeginning) {
      if (this.byteorder === 'le') b.writeUInt32LE(challenge, offset)
      else b.writeUInt32BE(challenge, offset)
      offset += 4
    }

    if (payload) {
      payload.copy(b, offset)
      offset += payload.length
    }

    if (challengeAtEnd) {
      if (this.byteorder === 'le') b.writeUInt32LE(challenge, offset)
      else b.writeUInt32BE(challenge, offset)
    }

    return await this.udpSend(
      b,
      (buffer) => {
        const reader = this.reader(buffer)
        const header = reader.int(4)
        if (header === -1) {
          // full package
          this.debugLog('Received full packet')
          return onResponse(reader.rest())
        }
      },
      onTimeout
    )
  }
}
