// Only for testing.
export let listeners
export let disposals

beforeEach(() => {
  listeners = {}
  disposals = []
})

afterEach(() => { disposals.forEach(fn => fn()) })

export const listen = (component, event) => {
  if (Array.isArray(event)) {
    event.forEach(e => listen(component, e))
    return
  }

  if (!listeners[component]) {
    listeners[component] = {}
    listeners[component].stack = []
  }

  if (listeners[component][event]) return

  listeners[component][event] = { payloads: [], calls: 0 }

  const off = component.$on(event, e => {
    listeners[component].stack.push(event)
    listeners[component][event].payloads.push(e.detail)
    listeners[component][event].calls += 1
  })

  disposals.push(off)
}

export const getListener = component => {
  const listener = listeners[component]
  if (!listener) {
    throw Error(
      'This component has not been registered and has no listeners, ' +
    'setup the listener before calling the matcher.\n\n' +
    'Eg: listen(component, \'myEvent\')\n\n'
    )
  }
  return listener
}

export const getEventData = (component, event) => {
  const listener = getListener(component)
  const eventData = listener[event]
  if (!eventData) {
    throw Error(
    `There are no listeners for the event \`${event}\` on this component, ` +
    'setup the listener before calling the matcher.\n\n' +
    'Eg: listen(component, \'myEvent\')\n\n'
    )
  }
  return eventData
}
