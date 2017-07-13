import { throws } from '../index'

describe('throws', () => {
  it('catches sync errors', () => {
    const err = throws(() => { throw new Error('hah') })
    expect(err.message).toBe('hah')
  })

  it('throws when no error is thrown', () => {
    expect(() => throws(() => 42)).toThrow(/supposed/)
  })

  it('catches async errors from functions', async () => {
    const err = await throws(() => Promise.reject(new Error('hah')))
    expect(err.message).toBe('hah')
  })

  it('reject when an async functions promise resolves', async () => {
    expect.assertions(1)
    try {
      await throws(() => Promise.resolve(42))
    } catch (err) {
      expect(err.message).toMatch(/supposed/)
    }
  })

  it('catches and returns when passed a promise that rejects', async () => {
    const err = await throws(Promise.reject(new Error('hah')))
    expect(err.message).toBe('hah')
  })

  it('rejects when passed a promise that resolves', async () => {
    expect.assertions(1)
    try {
      await throws(Promise.resolve(42))
    } catch (err) {
      expect(err.message).toMatch(/supposed/)
    }
  })

  it('uses the specified message', () => {
    expect(() => throws(() => 42, 'god dammit')).toThrow('god dammit')
  })
})
