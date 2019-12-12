import { printExpected, printReceived } from 'jest-matcher-utils'
import { getListener } from '../listen'

import { buildMessage } from './toHaveFiredEventWith'

export default function toHaveFiredLastEventWith (component, payload) {
  const listener = getListener(component)
  const event = listener.stack[listener.stack.length - 1]
  const options = { isNot: this.isNot }

  if (event === undefined || event === null) {
    return {
      pass: false,
      message: () => `Expected: ${printExpected(payload)}\n` +
      `Received: ${printReceived('no events')}`
    }
  }

  return buildMessage(
    'toHaveFiredLastEventWith',
    options,
    component,
    event,
    payload,
    true
  )
}
