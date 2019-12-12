import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils'
import { getListener, getEventData } from '../listen'
import { isEqual } from 'underscore'

export const buildMessage = (name, options, component, event, payload, showPayloads = false) => {
  const isNot = options.isNot
  const listener = getListener(component)
  const eventData = getEventData(listener, event)
  const pass = eventData.payloads.some(p => isEqual(p, payload))
  const hint = matcherHint(name, 'component', undefined, options)
  const expectedMsg = not => `Expected${not ? ' not to have fired with' : ''}: ${printExpected(payload)}`
  const payloadsMsg = eventData.payloads.length === 1
    ? `${printReceived(eventData.payloads[0])}`
    : eventData.payloads.map((p, i) => `\n\t   ${i}: ${printReceived(p)}`)
  const receivedMsg = (
    (showPayloads && eventData.calls > 1) || (eventData.calls > 0 && !isNot)
      ? `\nReceived: ${payloadsMsg}`
      : ''
  ) +
    '\n\n' +
    `Event: ${event}\n` +
    `Number of calls: ${printReceived(eventData.calls)}\n` +
    `Events stack: ${printReceived(listener.stack)}`
  const msg = not => () => hint + '\n\n' + expectedMsg(not) + receivedMsg
  return {
    pass,
    message: pass ? msg(true) : msg(false),
    actual: event
  }
}

export default function toHaveFiredEventWith (component, event, payload) {
  const options = { isNot: this.isNot }
  return buildMessage('toHaveFiredEventWith', options, component, event, payload)
}
