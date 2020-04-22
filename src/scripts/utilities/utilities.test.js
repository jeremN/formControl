import * as utilities from './utilities.js'

describe('Utilities tests', () => {

  it('mergeObject should merge object correctly', () => {
    const expected = {
      a: 1,
      b: 'Hello there general Kenobi!',
      c: false,
      z: 42
    }
    const actual = utilities.mergeObject({
      a: 1,
      b: 'Hello world',
      c: true
    }, {
      b: 'Hello there general Kenobi!',
      c: false,
      z: 42
    })
    expect(actual).toMatchObject(expected)
  })

  it('isFunction should return true if value is a function', () => {
    const myFunction = () => {
      console.log('Hi, i\'m a function')
    }
    const result = utilities.isFunction(myFunction)
    expect(result).toBe(true)
  })

  it('isFunction should return false if value is not a function', () => {
    const notAFunction = 42
    const result = utilities.isFunction(notAFunction)
    expect(result).toBe(false)
  })

  it('hasObjectLen should return true if a given value is an object and has length', () => {
    const anObj = {
      a: 1,
      b: 2
    }
    const emptyObj = {}
    const result = utilities.hasObjectLen(anObj)
    const shouldBeFalse = utilities.hasObjectLen(emptyObj)
    expect(result).toBe(true)
    expect(shouldBeFalse).toBe(false)
  })

  it('hasObjectLen should return false if a given value is not an object', () => {
    const notAnObj = 12
    const result = utilities.hasObjectLen(notAnObj)
    expect(result).toBe(false)
  })

  it('capitalize should capitalize the first letter of a string', () => {
    const myString = 'hi there'
    const expectedStr = 'Hi there'
    const result = utilities.capitalize(myString)
    expect(result).toMatch(expectedStr)
  })

  it('updateState should updateState correctly', () => {
    const expected = {
      a: 1,
      b: 'Hello there general Kenobi!',
      c: false,
      z: 42,
      y: {
        g: 'Hi',
        l: 2
      },
      k: {
        o: 'log(n)'
      }
    }
    const updatedState = utilities.updateState({
      a: 1,
      b: 'Hello world',
      c: true,
      y: {
        g: 4,
        l: 7
      },

    }, {
      b: 'Hello there general Kenobi!',
      c: false,
      z: 42,
      y: {
        g: 'Hi',
        l: 2
      },
      k: {
        o: 'log(n)'
      }    
    })
    expect(updatedState).toMatchObject(expected)

  })
})