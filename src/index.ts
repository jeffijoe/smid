/**
 * Catches a sync error and returns the error. Throws if not caught.
 *
 * @param fn The function that should invoke the error.
 * @param msg Optional message.
 */
export function throws<T = Error> (fn: Function, msg?: string): T

/**
 * Catches an async error. Throws if promise is not rejected.
 * @param fn Can be a promise or a function returning a promise
 * @param msg Optional message.
 */
export function throws<T = Error> (
  fn: Promise<any> | (() => Promise<any>),
  msg?: string
): Promise<T>

/**
 * Implememtation.
 * @param fnOrPromise Function or a Promise.
 * @param msg Optional message.
 */
export function throws<T = Error> (
  fnOrPromise: Promise<any> | (() => Promise<any>) | Function,
  msg?: string
): T | Promise<T> {
  const isFunction = typeof fnOrPromise === 'function'
  const nope = new Error(
    msg ||
      (isFunction
        ? `The following function was supposed to throw an error:\n${fnOrPromise}`
        : 'The Promise was supposed to be rejected')
  )

  if (isFunction) {
    try {
      const result = (fnOrPromise as Function)()
      if (result && result.then) {
        return handlePromise(result, nope)
      }
    } catch (err) {
      return err
    }
    throw nope
  }

  return handlePromise(fnOrPromise as Promise<any>, nope)
}

/**
 * Attaches `then` and `reject` handlers
 * @param p The Promise to handle.
 */
function handlePromise (p: Promise<any>, errToThrow: Error) {
  return Promise.resolve()
    .then(() => {
      return p.then(() => Promise.reject(errToThrow))
    })
    .catch(err => {
      if (err === errToThrow) {
        throw errToThrow
      }
      return err
    })
}
