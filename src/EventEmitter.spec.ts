import { EventEmitter } from './EventEmitter'

describe('EventEmitter', () => {
  beforeEach(() => {
    EventEmitter.topics.clear()
  })

  test('on() registers a handler for a topic', () => {
    const fn = vi.fn()
    EventEmitter.on('test', fn)
    expect(EventEmitter.topics.has('test')).toBe(true)
  })

  test('emit() calls registered handler with the emitted value', () => {
    const fn = vi.fn()
    EventEmitter.on('test', fn)
    EventEmitter.emit('test', 42)
    expect(fn).toHaveBeenCalledWith(42)
  })

  test('on() supports multiple handlers for the same topic', () => {
    const fn1 = vi.fn()
    const fn2 = vi.fn()
    EventEmitter.on('test', fn1)
    EventEmitter.on('test', fn2)
    EventEmitter.emit('test', 'value')
    expect(fn1).toHaveBeenCalledWith('value')
    expect(fn2).toHaveBeenCalledWith('value')
  })

  test('emit() on non-existent topic does not throw', () => {
    expect(() => EventEmitter.emit('noop', null)).not.toThrow()
  })

  test('handlers are not called for different topics', () => {
    const fn = vi.fn()
    EventEmitter.on('topicA', fn)
    EventEmitter.emit('topicB', 'data')
    expect(fn).not.toHaveBeenCalled()
  })
})
