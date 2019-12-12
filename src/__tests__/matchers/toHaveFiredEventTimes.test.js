import '../../'

import { render, fireEvent } from '@testing-library/svelte'

import Comp from '../fixtures/Comp.svelte'

describe('.toHaveFiredEventTimes', () => {
  test('passes when event has fired correct number of times', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e1')
    const button = getByText('e1')
    await fireEvent.click(button)
    expect(component).toHaveFiredEventTimes('e1', 1)
  })

  test('fails when event has not fired correct number of times', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e1')
    const button = getByText('e1')
    await fireEvent.click(button)
    expect(() => {
      expect(component).toHaveFiredEventTimes('e1', 2)
    }).toThrowErrorMatchingSnapshot()
  })
})

describe('.not.toHaveFiredEventTimes', () => {
  test('passes when event has not fired number of times', () => {
    const { component } = render(Comp)
    listen(component, 'e1')
    expect(component).not.toHaveFiredEventTimes('e1', 1)
  })

  test('fails when event has fired correct number of times', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e1')
    const button = getByText('e1')
    await fireEvent.click(button)
    expect(() => {
      expect(component).not.toHaveFiredEventTimes('e1', 1)
    }).toThrowErrorMatchingSnapshot()
  })
})
