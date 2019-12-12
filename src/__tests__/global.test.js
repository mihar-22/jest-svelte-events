import '../index'

import { render, fireEvent } from '@testing-library/svelte'

import Comp from './fixtures/Comp.svelte'

describe('global', () => {
  describe('listen', () => {
    let listeners

    beforeEach(() => {
      listeners = global.SVELTE_LISTENERS
    })

    test('listen should be defined globally', () => {
      expect(global.listen).toBeDefined()
    })

    test('listening to component should add it to global listeners object', () => {
      const { component } = render(Comp)
      listen(component, 'e1')
      expect(listeners[component]).toMatchSnapshot()
    })

    test('listeners should be reset after each test', () => {
      expect(listeners).toEqual({})
    })

    test('calling listen on same event should not make any changes', () => {
      const { component } = render(Comp)
      listen(component, 'e1')
      listeners[component].e1.calls = 1
      listen(component, 'e1')
      expect(listeners[component].e1.calls).toBe(1)
    })

    test('firing event should keep track of calls, payloads and stack', async () => {
      const { component, getByText } = render(Comp)
      // e1
      listen(component, 'e1')
      const e1Button = getByText('e1')
      await fireEvent.click(e1Button)
      expect(listeners[component].e1.payloads).toEqual([null])
      expect(listeners[component].e1.calls).toBe(1)
      await fireEvent.click(e1Button)
      expect(listeners[component].e1.payloads).toEqual([null, null])
      expect(listeners[component].e1.calls).toBe(2)
      // e2
      listen(component, 'e2')
      const e2Button = getByText('e2')
      await fireEvent.click(e2Button)
      expect(listeners[component].e2.payloads).toEqual([50])
      expect(listeners[component].e2.calls).toBe(1)
      // stack
      expect(listeners[component].stack).toEqual(['e1', 'e1', 'e2'])
      expect(listeners[component]).toMatchSnapshot()
    })

    test('can listen to multiple events', async () => {
      const { component, getByText } = render(Comp)
      listen(component, ['e1', 'e2', 'e3'])
      const e1Button = getByText('e1')
      const e2Button = getByText('e2')
      const e3Button = getByText('e3')
      await fireEvent.click(e1Button)
      await fireEvent.click(e2Button)
      await fireEvent.click(e3Button)
      expect(listeners[component]).toMatchSnapshot()
    })
  })
})
