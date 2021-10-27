class Player {
  name = ''
  raw = {}

  constructor(data) {
    if (typeof data === 'string') {
      this.name = data
    } else {
      const { name, ...raw } = data
      if (name) this.name = name
      if (raw) this.raw = raw
    }
  }
}

export default class Players extends Array {
  push(data) {
    super.push(new Player(data))
  }
}
