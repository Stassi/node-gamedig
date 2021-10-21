import valveProtocol from './ValveProtocol.js'

export default class ProtocolResolver {
  create(protocolId) {
    if (protocolId === 'valve') return new valveProtocol()
    else throw new Error('unsupported protocol')
  }
}
