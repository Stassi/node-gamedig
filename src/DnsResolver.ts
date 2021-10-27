import type Logger from './Logger'
import { lookup } from 'node:dns'
import punycode from 'punycode'
import util from 'node:util'

const dnsLookupAsync = util.promisify(lookup)

export default class DnsResolver {
  private logger: Logger

  constructor(logger: Logger) {
    this.logger = logger
  }

  isIp(host: string) {
    return !!host.match(/\d+\.\d+\.\d+\.\d+/)
  }

  /**
   * Response port will only be present if srv record was involved.
   * @param {string} host
   * @returns {Promise<{address:string, port:number=}>}
   */
  async resolve(host: string) {
    this.logger.debug('DNS Lookup: ' + host)

    if (this.isIp(host)) {
      this.logger.debug('Raw IP Address: ' + host)
      return { address: host }
    }

    const asciiForm = punycode.toASCII(host)
    if (asciiForm !== host) {
      this.logger.debug('Encoded punycode: ' + host + ' -> ' + asciiForm)
      host = asciiForm
    }

    this.logger.debug('Standard Resolve: ' + host)
    // For some reason, this sometimes returns a string address rather than an object.
    // I haven't been able to reproduce, but it's been reported on the issue tracker.
    let address = await dnsLookupAsync(host)
    this.logger.debug('Found address: ' + address)
    return { address }
  }
}
