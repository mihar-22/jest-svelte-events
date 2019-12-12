import { SvelteComponent } from 'svelte/types/runtime'

declare function listen<T extends SvelteComponent>(component: T, event: string | string[])

declare namespace jest {
  interface Matchers<R, T> {
    toHaveFiredEvent(event: string): R
    toHaveFiredEvents(events: string[]): R
    toHaveFiredEventsInOrder(events: string[]): R
    toHaveFiredEventTimes(event: string, times: number): R
    toHaveFiredEventWith(event: string, payload: any): R
    toHaveFiredLastEventWith(payload: any): R
    toHaveFiredNthEventWith(n: number, payload: any): R
  }
}