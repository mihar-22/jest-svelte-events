export const getListener = component => {
  const listeners = global.SVELTE_LISTENERS
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
