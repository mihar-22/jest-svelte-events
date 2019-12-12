import '../../'
import { getListener, getEventData } from '../../utils/getters'

import { render } from '@testing-library/svelte'

import Comp from '../fixtures/Comp.svelte'

describe('utils', () => {
  describe('getters', () => {
    describe('getListener', () => {
      test('returns listener', () => {
        const { component } = render(Comp)
        listen(component, 'e1')
        expect(getListener(component)).toMatchSnapshot()
      })

      test('throws error when component has not been registered', () => {
        const { component } = render(Comp)
        expect(() => {
          expect(component).toHaveFiredEvent('e1')
        }).toThrowErrorMatchingSnapshot()
      })
    })

    describe('getEventData', () => {
      test('returns event data', () => {
        const { component } = render(Comp)
        listen(component, 'e1')
        expect(getEventData(component, 'e1')).toMatchSnapshot()
      })

      test('throws error when event has no listener registered', () => {
        const { component } = render(Comp)
        listen(component, 'e1')
        expect(() => {
          expect(component).toHaveFiredEvent('e2')
        }).toThrowErrorMatchingSnapshot()
      })
    })
  })
})
