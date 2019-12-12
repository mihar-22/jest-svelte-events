import { getListener } from '../listen'

export default function toHaveFiredEventsInOrder (component, events) {
  const { matcherHint, printExpected, printReceived } = this.utils
  const listener = getListener(component)
  const pass = this.equals(listener.stack, events)
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
