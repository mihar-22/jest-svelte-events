import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils'
import { getListener } from '../utils/getters'

export default function toHaveFiredEvents (component, events) {
  const listener = getListener(component)
  const pass = events[this.isNot ? 'some' : 'every'](event => listener.stack.includes(event))
  const options = { isNot: this.isNot }
  const hint = matcherHint('toHaveFiredEvents', 'component', undefined, options)
  const expectedMsg = not => `Expected${not ? ' not ' : ' '}to have fired: ${printExpected(events)}\n`
  const receivedMsg = `Recevied events: ${printReceived(listener.stack)}`
  const msg = not => () => hint + '\n\n' + expectedMsg(not) + receivedMsg
  return {
    pass,
    message: pass ? msg(true) : msg(false),
    actual: events
  }
}
