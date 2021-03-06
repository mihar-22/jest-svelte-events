import { getListener } from '../listen'

import { buildMessage } from './toHaveFiredEventWith'

export default function toHaveFiredNthEventWith (component, n, payload) {
  const { printExpected, printReceived } = this.utils
  const listener = getListener(component)
  const event = listener.stack[n - 1]
  const options = { isNot: this.isNot }

  if (event === undefined || event === null) {
    return {
      pass: false,
      message: () => `Expected: ${printExpected(payload)}\n` +
      `Received: ${printReceived('no events')}`
    }
  }

  return buildMessage.call(
    this,
    'toHaveFiredNthEventWith',
    options,
    component,
    event,
    payload,
    true
  )
}
