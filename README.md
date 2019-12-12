<div align="center">
<h1>jest-svelte-events</h1>

<p>Custom Jest matchers to test Svelte events</p>

[![version][version-badge]][package]
[![MIT License][license-badge]][license]
</div>

<hr />

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
  - [Babel](#babel)
- [Usage](#usage)
  - [`listen`](#listen)
  - [`toHaveFiredEvent`](#tohavefiredevent)
  - [`toHaveFiredEvents`](#tohavefiredevents)
  - [`toHaveFiredEventsInOrder`](#tohavefiredeventsinorder)
  - [`toHaveFiredEventTimes`](#tohavefiredeventtimes)
  - [`toHaveFiredEventWith`](#tohavefiredeventwith)
  - [`toHaveFiredLastEventWith`](#tohavefiredlasteventwith)
  - [`toHaveFiredNthEventWith`](#tohavefiredntheventwith)
- [Contributions](#contributions)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This library has `peerDependencies` listings for `svelte >= 3`.

`npm install svelte-jester jest-svelte-events -D`

Add the following to your Jest config

```json
{    
  "setupFilesAfterEnv": [
    "jest-svelte-events/extend-expect"
  ],
  "transform": {
    "^.+\\.svelte$": "svelte-jester"
  },
  "moduleFileExtensions": [
    "js",
    "svelte"
  ]
}
```

### Babel

If you're using Babel then also add the following

`npm install @babel/core @babel/preset-env babel-jest -D`

Add the following to your Jest config

```json
"transform": {
  "^.+\\.js$": "babel-jest",
  "^.+\\.svelte$": "svelte-jester"
}
```

Create a `.babelrc` and add the following

```json
{
  "presets": [["@babel/preset-env", { "targets": { "node": "current" } }]]
}
```

## Usage

### `listen`

This is a global function called to setup any listeners on the component, you must call this before any
matchers. Listeners are destroyed after each test block.

```ts
listen(component: SvelteComponent, event: string | string[])
```

```js
import { render } from '@testing-library/svelte'

import MyComponent from './MyComponent.svelte'

test('', () => {
  const { component } = render(MyComponent)
  // If you're not using testing-library/svelte.
  // const component = new MyComponent()
  listen(component, 'myEvent')

  // Multiple listeners
  listen(component, ['eventOne', 'eventTwo'])
})
```

### `toHaveFiredEvent`

Check whether a event has fired.

```ts
toHaveFiredEvent(event: string)
```

```js
import { render } from '@testing-library/svelte'

import MyComponent from './MyComponent.svelte'

test('', () => {
  const { component } = render(MyComponent)
  listen(component, 'myEvent')
  // ...
  // code ...
  // ...
  expect(component).toHaveFiredEvent('myEvent')
})
```

### `toHaveFiredEvents`

Check whether multiple events have fired.

```ts
toHaveFiredEvent(events: string[])
```

```js
import { render } from '@testing-library/svelte'

import MyComponent from './MyComponent.svelte'

test('', () => {
  const { component } = render(MyComponent)
  listen(component, ['eventOne', 'eventTwo'])
  // ...
  // code ...
  // ...
  expect(component).toHaveFiredEvents(['eventOne', 'eventTwo'])
})
```

### `toHaveFiredEventsInOrder`

Check whether all the events were fired in matching order.

```ts
toHaveFiredEventsInOrder(events: string[])
```

```js
import { render } from '@testing-library/svelte'

import MyComponent from './MyComponent.svelte'

test('', () => {
  const { component } = render(MyComponent)
  listen(component, ['eventOne', 'eventTwo'])
  // ...
  // code ...
  // ...
  expect(component).toHaveFiredEventsInOrder(['eventTwo', 'eventOne', 'eventTwo'])
})
```

### `toHaveFiredEventTimes`

Check whether a event was fired a set number of times.

```ts
toHaveFiredEventsInOrder(event: string, times: number)
```

```js
import { render } from '@testing-library/svelte'

import MyComponent from './MyComponent.svelte'

test('', () => {
  const { component } = render(MyComponent)
  listen(component, 'myEvent')
  // ...
  // code ...
  // ...
  expect(component).toHaveFiredEventTimes('myEvent', 1)
})
```

### `toHaveFiredEventWith`

Check whether a event was fired with a specific value.

```ts
toHaveFiredEventWith(event: string, payload: any)
```

```js
import { render } from '@testing-library/svelte'

import MyComponent from './MyComponent.svelte'

test('', () => {
  const { component } = render(MyComponent)
  listen(component, 'myEvent')
  // ...
  // code ...
  // ...
  expect(component).toHaveFiredEventWith('myEvent', 100)
})
```

### `toHaveFiredLastEventWith`

Check whether the last event was fired with a specific value.

```ts
toHaveFiredLastEventWith(payload: any)
```

```js
import { render } from '@testing-library/svelte'

import MyComponent from './MyComponent.svelte'

test('', () => {
  const { component } = render(MyComponent)
  listen(component, ['eventOne', 'eventTwo', 'eventThree'])
  // ...
  // code ...
  // ...
  expect(component).toHaveFiredLastEventWith('end')
})
```

### `toHaveFiredNthEventWith`

Check whether the nth event was fired with a specific value.

```ts
toHaveFiredNthEventWith(n: number, payload: any)
```

```js
import { render } from '@testing-library/svelte'

import MyComponent from './MyComponent.svelte'

test('', () => {
  const { component } = render(MyComponent)
  listen(component, ['eventOne', 'eventTwo', 'eventThree'])
  // ...
  // code ...
  // ...
  expect(component).toHaveFiredNthEventWith(1, 'start')
})
```

## Contributions

All contributions are encouraged and welcome! If you have any ideas then just open an
issue.

## LICENSE

[MIT](LICENSE)

<!-- prettier-ignore-start -->
[package]: https://www.npmjs.com/package/jest-svelte-events
[version-badge]: https://img.shields.io/npm/v/jest-svelte-events
[license]: https://github.com/mihar-22/jest-svelte-events/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/mihar-22/jest-svelte-events?color=b
<!-- prettier-ignore-end -->
