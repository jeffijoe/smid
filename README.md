# smid

Catches errors and returns them. Useful for unit testing. 

Written in TypeScript.

[![npm](https://img.shields.io/npm/v/smid.svg?maxAge=1000)](https://www.npmjs.com/package/smid)
[![dependency Status](https://img.shields.io/david/jeffijoe/smid.svg?maxAge=1000)](https://david-dm.org/jeffijoe/smid)
[![devDependency Status](https://img.shields.io/david/dev/jeffijoe/smid.svg?maxAge=1000)](https://david-dm.org/jeffijoe/smid)
[![Build Status](https://img.shields.io/travis/jeffijoe/smid.svg?maxAge=1000)](https://travis-ci.org/jeffijoe/smid)
[![Coveralls](https://img.shields.io/coveralls/jeffijoe/smid.svg?maxAge=1000)](https://coveralls.io/github/jeffijoe/smid)
[![npm](https://img.shields.io/npm/dt/smid.svg?maxAge=1000)](https://www.npmjs.com/package/smid)
[![npm](https://img.shields.io/npm/l/smid.svg?maxAge=1000)](https://github.com/jeffijoe/smid/blob/master/LICENSE.md)
[![Built with TypeScript](https://img.shields.io/badge/typings-included-brightgreen.svg)](http://typescriptlang.org)


# Install

```
npm install --save smid
```

# Usage

Import the `throws` function.

```js
// ES6 / TypeScript
import { throws } from 'smid'

// CommonJS
const throws = require('smid').throws
```

`throws` supports both sync functions and async functions. When catching sync errors, they are returned as-is. When catching `Promise` rejections, a `Promise` is returned that resolves to the error that caused the rejection.

It works by first trying to catch sync errors. If no error is thrown, it checks if the result is a `Promise` (does it have a `.then` property?), and attaches a rejection continuation.

**Catching sync errors**

```js
// Sync function
const err = throws(() => {
  // ... some code that throws
  throw new Error('boo!')
})

console.log(err.message) // boo!
```

**Catching `async` errors**

```js
// Async functions
const err = await throws(async () => {
  await someStuff()
  throw new Error('boo!')
})

console.log(err.message) // boo!
```

**Catching rejections with plain `Promise`s**

```js
// Async functions
throws(() => {
  return Promise.reject(new Error('boo!'))
}).then((err) => {
  console.log(err.message) // boo!
})

// Just passing in a Promise
throws(Promise.reject(new Error('boo!')))
  .then((err) => {
    console.log(err.message) // boo!
  })
```

**If nothing throws...**

```js
throws(() => 'All is hell that ends well')
// throws an error
```

# API

## `throws`

**Signature**

* `throws(fnOrPromise, [msg])`
  - `fnOrPromise`: A sync function, an async function, or a `Promise`.
  - `msg`: If the function/promise is not throwing, an error is thrown instead. Use `msg` to override it's default message.

# Why?

I find myself writing this function over and over for my testing needs. Jest's `expect(...).toThrow()` is usually not enough; for example when catching errors from `axios`, I want to inspect `err.response` - Jest does not let me do that.

# What does `smid` mean?

It's Danish, it means `throw`. 🇩🇰

# Author

Jeff Hansen - [@Jeffijoe](https://twitter.com/jeffijoe)
