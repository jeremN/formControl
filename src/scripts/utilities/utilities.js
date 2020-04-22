/** Merge object into one
  * @param {Object} defaultObj, updatedObj
  * @return {Object}
  */
export function mergeObject (defaultObj, updatedObj) {
  return {
    ...defaultObj,
    ...updatedObj
  }
}

/** Determine if a given node is an HTMLElement
  * @param {:Any} node
  * @return {Boolean}
  */
export function isHTMLElement (node) {
  return node instanceof HTMLElement
}

/** Determine if a given value is a function
  * @param {:Any} functionToCheck
  * @return {Boolean}
  */
export function isFunction (functionToCheck) {  
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}

// https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
/** Determine if a given element is an Object && if he has length
  * @param {:Any} obj
  * @return {Boolean}
  */
export function hasObjectLen (obj) {
  if (!obj) return false
  return Object.keys(obj).length > 0 && obj.constructor === Object
}

/** Capitalize the first letter of a string
  * @param {String}
  * @return {String}
  */
export function capitalize (s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

/** Update oldState with newState
  * @param {Object} oldState, newState
  * @return {Object}
  */
export function updateState (oldState, newState) {
  const updatedState = { ...oldState }
  Object.keys(newState).forEach((key) => {
    updatedState[key] = hasObjectLen(oldState[key]) && hasObjectLen(newState[key]) ? mergeObject(oldState[key], newState[key]) : newState[key]
  })

  return updatedState
}
