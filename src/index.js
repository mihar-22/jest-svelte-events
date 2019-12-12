import matchers from './matchers'

let listeners
let disposals

beforeEach(() => {
  listeners = {}
  global.SVELTE_LISTENERS = listeners
  disposals = []
})

afterEach(() => { disposals.forEach(fn => fn()) })

global.listen = (component, event) => {
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

if (global.expect !== undefined) {
  global.expect.extend(matchers)
} else {
  console.error(
    "Unable to find Jest's global expect." +
    '\nPlease check you have added jest-svelte-events correctly to your Jest configuration.' +
    '\nSee https://github.com/mihar-22/jest-svelte-events#installation for help.'
  )
}
