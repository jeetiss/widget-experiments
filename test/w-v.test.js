import WatchedValue from '../src/utils/w-v'

test('interface', () => {
  let inst = WatchedValue(1)

  expect(inst.value).toBeDefined()
  expect(inst.subscribe).toBeDefined()
  expect(inst.unsubscribe).toBeDefined()

  expect(typeof inst.value).toBe('function')
  expect(typeof inst.subscribe).toBe('function')
  expect(typeof inst.unsubscribe).toBe('function')
});

test('initial value', () => {
  let inst = WatchedValue(1)

  expect(inst.value()).toBe(1)
})

test('value', () => {
  let inst = WatchedValue(1)

  expect(inst.value()).toBe(1)
  expect(inst.value(10)).toBe(10)
})

test('subscribe', () => {
  let inst = WatchedValue(1)
  let spy = jest.fn()

  expect(inst.value()).toBe(1)

  let off = inst.subscribe(spy)

  expect(typeof off).toBe('function')

  inst.value(10)
  inst.value(12)

  expect(spy).toHaveBeenCalledTimes(2)
  expect(inst.value()).toBe(12)

  off()
})

test('unsubscribe', () => {
  let inst = WatchedValue(1)
  let spy = jest.fn()
  let off = inst.subscribe(spy)

  expect(typeof off).toBe('function')

  off()

  inst.value(10)

  expect(spy).not.toHaveBeenCalled()
})
