import matchers from './matchers'
import { listen } from './listen'

if (global.listen === undefined) {
  global.listen = listen
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
