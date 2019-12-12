import '../../'
import { render, fireEvent } from '@testing-library/svelte'
import Comp from '../fixtures/Comp.svelte'

describe('.toHaveFiredEventsInOrder', () => {
  test('passes when given events that fired in correct order', async () => {
    const { component, getByText } = render(Comp)
    listen(component, ['e1', 'e2'])
    const e1Button = getByText('e1')
    const e2Button = getByText('e2')
    await fireEvent.click(e1Button)
    await fireEvent.click(e2Button)
    await fireEvent.click(e1Button)
    expect(component).toHaveFiredEventsInOrder(['e1', 'e2', 'e1'])
  })

  test('fails when given events that did not fire in correct order', async () => {
    const { component, getByText } = render(Comp)
    listen(component, ['e1', 'e2'])
    const e1Button = getByText('e1')
    const e2Button = getByText('e2')
    await fireEvent.click(e2Button)
    await fireEvent.click(e1Button)
    expect(() => {
      expect(component).toHaveFiredEventsInOrder(['e1', 'e2'])
    }).toThrowErrorMatchingSnapshot()
  })
})

describe('.not.toHaveFiredEventsInOrder', () => {
  test('passes when given events that did not fire in correct order', async () => {
    const { component, getByText } = render(Comp)
    listen(component, ['e1', 'e2'])
    const e1Button = getByText('e1')
    const e2Button = getByText('e2')
    await fireEvent.click(e2Button)
    await fireEvent.click(e1Button)
    expect(component).not.toHaveFiredEventsInOrder(['e1', 'e2'])
  })

  test('fails when given events that did fire in correct order', async () => {
    const { component, getByText } = render(Comp)
    listen(component, ['e1', 'e2'])
    const e1Button = getByText('e1')
    const e2Button = getByText('e2')
    await fireEvent.click(e1Button)
    await fireEvent.click(e2Button)
    expect(() => {
      expect(component).not.toHaveFiredEventsInOrder(['e1', 'e2'])
    }).toThrowErrorMatchingSnapshot()
  })
})
