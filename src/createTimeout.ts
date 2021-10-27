// @ts-ignore
export default function createTimeout(timeoutMs, timeoutMsg) {
  let cancel = null
  const wrapped = new Promise((res, rej) => {
    const timeout = setTimeout(() => {
      rej(new Error(timeoutMsg + ' - Timed out after ' + timeoutMs + 'ms'))
    }, timeoutMs)
    cancel = () => {
      clearTimeout(timeout)
    }
  })

  // @ts-ignore
  wrapped.cancel = cancel
  return wrapped
}
