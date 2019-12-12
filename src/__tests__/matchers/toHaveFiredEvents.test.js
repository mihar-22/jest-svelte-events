import '../../'
import { render, fireEvent } from '@testing-library/svelte'
import Comp from '../fixtures/Comp.svelte'

describe('.toHaveFiredEvents', () => {
  test('passes when given events that fired', async () => {
    const { component, getByText } = render(Comp)
    listen(component, ['e1', 'e2'])
    const e1Button = getByText('e1')
    await fireEvent.click(e1Button)
    const e2Button = getByText('e2')
    await fireEvent.click(e2Button)
    expect(component).toHaveFiredEvents(['e1', 'e2'])
  })

  test('fails when given events that did not fire', () => {
    const { component } = render(Comp)
    listen(component, ['e1', 'e2'])
    expect(() => {
      expect(component).toHaveFiredEvents(['e1', 'e2'])
    }).toThrowErrorMatchingSnapshot()
  })
})

describe('.not.toHaveFiredEvents', () => {
  test('passes when given events that did not fire', () => {
    const { component } = render(Comp)
    listen(component, ['e1', 'e2'])
    expect(component).not.toHaveFiredEvents(['e1', 'e2'])
  })

  test('fails when given events that did fire', async () => {
    const { component, getByText } = render(Comp)
    listen(component, ['e1', 'e2'])
    const e1Button = getByText('e1')
    await fireEvent.click(e1Button)
    expect(() => {
      expect(component).not.toHaveFiredEvents(['e1', 'e2'])
    }).toThrowErrorMatchingSnapshot()
  })
})
