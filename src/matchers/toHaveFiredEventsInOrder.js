import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils'
import { getListener } from '../utils/getters'
import { isEqual } from 'underscore'

export default function toHaveFiredEventsInOrder (component, events) {
  const listener = getListener(component)
  const pass = isEqual(listener.stack, events)
  const options = { isNot: this.isNot }
  const hint = matcherHint('toHaveFiredEventsInOrder', 'component', undefined, options)
  const expectedMsg = not =>
    `Expected${not ? ' not ' : ' '}to have fired in order: ${printExpected(events)}\n`
  const receivedMsg = `Recevied events in order: ${printReceived(listener.stack)}`
  const msg = not => () => hint + '\n\n' + expectedMsg(not) + receivedMsg
  return {
    pass,
    message: pass ? msg(true) : msg(false),
    actual: events
  }
}
