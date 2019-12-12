import { getListener, getEventData } from '../listen'

const pluralize = count => `time${count === 1 ? '' : 's'}`

export default function toHaveFiredEventTimes (component, event, times) {
  const { matcherHint, printExpected, printReceived } = this.utils
  const listener = getListener(component)
  const eventData = getEventData(listener, event)
  const pass = eventData.calls === times
  const options = { isNot: this.isNot }
  const hint = matcherHint('toHaveFiredEventTimes', 'component', undefined, options)
  const expectedMsg = not =>
    `Expected${not ? ' not ' : ' '}to have fired ${event}: ${printExpected(times)} ${pluralize(times)}\n`
  const receivedMsg =
    `Recevied: ${printReceived(eventData.calls)} ${pluralize(eventData.calls)}\n\n` +
    `Events stack: ${printReceived(listener.stack)}`
  const msg = not => () => hint + '\n\n' + expectedMsg(not) + receivedMsg
  return {
    pass,
    message: pass ? msg(true) : msg(false),
    actual: event
  }
}
