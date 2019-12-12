import '../../'
import { render, fireEvent } from '@testing-library/svelte'
import Comp from '../fixtures/Comp.svelte'

describe('.toHaveFiredLastEventWith', () => {
  test('passes when last event contains the correct payload', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e2')
    const button = getByText('e2')
    await fireEvent.click(button)
    expect(component).toHaveFiredLastEventWith(50)
  })

  test('fails when no events were fired', async () => {
    const { component } = render(Comp)
    listen(component, 'e2')
    expect(() => {
      expect(component).toHaveFiredLastEventWith(50)
    }).toThrowErrorMatchingSnapshot()
  })

  test('fails when last event fires without the correct payload', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e2')
    const button = getByText('e2')
    await fireEvent.click(button)
    expect(() => {
      expect(component).toHaveFiredLastEventWith(100)
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
      expect(component).toHaveFiredLastEventWith(100)
    }).toThrowErrorMatchingSnapshot()
  })
})

describe('.not.toHaveFiredLastEventWith', () => {
  test('passes when last event does not contain the correct payload', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e2')
    const button = getByText('e2')
    await fireEvent.click(button)
    expect(component).not.toHaveFiredLastEventWith(100)
  })

  test('passes when no events have been fired', async () => {
    const { component } = render(Comp)
    listen(component, 'e2')
    expect(component).not.toHaveFiredLastEventWith(100)
  })

  test('fails when last event fires with the correct payload', async () => {
    const { component, getByText } = render(Comp)
    listen(component, 'e2')
    const button = getByText('e2')
    await fireEvent.click(button)
    expect(() => {
      expect(component).not.toHaveFiredLastEventWith(50)
    }).toThrowErrorMatchingSnapshot()
  })
})
