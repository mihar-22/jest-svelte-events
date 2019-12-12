import '../../'

import { render, fireEvent } from '@testing-library/svelte'

import Comp from '../fixtures/Comp.svelte'

describe('.toHaveFiredEventWith', () => {
  test('passes when an event contains the correct payload', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e2')
    const button = getByText('e2')
    await fireEvent.click(button)
    expect(component).toHaveFiredEventWith('e2', 50)
  })

  test('fails when an event fires without the correct payload', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e2')
    const button = getByText('e2')
    await fireEvent.click(button)
    expect(() => {
      expect(component).toHaveFiredEventWith('e2', 100)
    }).toThrowErrorMatchingSnapshot()
  })

  test('does not print out received when event did not fire', async () => {
    const { component } = render(Comp)
    listen(component, 'e2')
    expect(() => {
      expect(component).toHaveFiredEventWith('e2', 100)
    }).toThrowErrorMatchingSnapshot()
  })

  test('prints out all received payloads on fail', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e2')
    const button = getByText('e2')
    await fireEvent.click(button)
    await fireEvent.click(button)
    await fireEvent.click(button)
    expect(() => {
      expect(component).toHaveFiredEventWith('e2', 100)
    }).toThrowErrorMatchingSnapshot()
  })

  test('prints out objects correctly on fail', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e4')
    const button = getByText('e4')
    await fireEvent.click(button)
    expect(() => {
      expect(component).toHaveFiredEventWith('e4', 100)
    }).toThrowErrorMatchingSnapshot()
  })
})

describe('.not.toHaveFiredEventWith', () => {
  test('passes when an event does not contain the correct payload', async () => {
    const { component } = render(Comp)
    listen(component, 'e2')
    expect(component).not.toHaveFiredEventWith('e2', 100)
  })

  test('fails when an event fires with the correct payload', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e2')
    const button = getByText('e2')
    await fireEvent.click(button)
    expect(() => {
      expect(component).not.toHaveFiredEventWith('e2', 50)
    }).toThrowErrorMatchingSnapshot()
  })
})
