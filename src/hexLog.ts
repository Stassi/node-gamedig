import type Buffer from 'node:buffer'

type HexBuffer = Buffer | string

export default function hexLog(buffer: HexBuffer) {
  let hexLine: string = '',
    chrLine: string = '',
    out: string = '',
    i: number = 0

  out += `Buffer length: ${buffer.length} bytes
`

  for (; i < buffer.length; i++) {
    const sliced: HexBuffer = buffer.slice(i, i + 1)

    hexLine += `${sliced.toString('hex')} `

    let chr: string = sliced.toString()

    if (chr < ' ' || chr > '~') chr = ' '

    chrLine += `${chr}  `

    if (hexLine.length > 60 || i === buffer.length - 1) {
      out += `${hexLine}
`
      out += `${chrLine}
`
      hexLine = chrLine = ''
    }
  }

  return out
}
