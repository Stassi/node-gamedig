import valheimServerStatus from './__mocks__/valheimServerStatus'
import zeroPlayersResponse from './mockedResponses/zeroPlayers'

const exampleHost: string = '95.156.194.254'

describe('valheimServerStatus', () => {
  it('should return the server status', async () => {
    expect(await valheimServerStatus(exampleHost)).toEqual(zeroPlayersResponse)
  })
})
