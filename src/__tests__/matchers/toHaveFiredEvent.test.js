import '../../'
import { render, fireEvent } from '@testing-library/svelte'
import Comp from '../fixtures/Comp.svelte'

describe('.toHaveFiredEvent', () => {
  test('passes when given an event that fired', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e1')
    const button = getByText('e1')
    await fireEvent.click(button)
    expect(component).toHaveFiredEvent('e1')
  })

  test('fails when given an event that did not fire', () => {
    const { component } = render(Comp)
    listen(component, 'e1')
    expect(() => {
      expect(component).toHaveFiredEvent('e1')
    }).toThrowErrorMatchingSnapshot()
  })
})

describe('.not.toHaveFiredEvent', () => {
  test('passes when given an event that did not fire', () => {
    const { component } = render(Comp)
    listen(component, 'e1')
    expect(component).not.toHaveFiredEvent('e1')
  })

  test('fails when given an event that did fire', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e1')
    const button = getByText('e1')
    await fireEvent.click(button)
    expect(() => {
      expect(component).not.toHaveFiredEvent('e1')
    }).toThrowErrorMatchingSnapshot()
  })
})
