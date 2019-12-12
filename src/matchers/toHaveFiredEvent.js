import { getListener, getEventData } from '../listen'

export default function toHaveFiredEvent (component, event) {
  const { matcherHint, printExpected, printReceived } = this.utils
  const listener = getListener(component)
  const eventData = getEventData(listener, event)
  const pass = eventData.calls > 0
  const options = { isNot: this.isNot }
  const hint = matcherHint('toHaveFiredEvent', 'component', undefined, options)
  const expectedMsg = not => `Expected${not ? ' not ' : ' '}to have fired: ${printExpected(event)}\n`
  const receivedMsg = `Recevied events: ${printReceived(listener.stack)}`
  const msg = not => () => hint + '\n\n' + expectedMsg(not) + receivedMsg
  return {
    pass,
    message: pass ? msg(true) : msg(false),
    actual: event
  }
}
