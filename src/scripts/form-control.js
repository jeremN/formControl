import * as validators from './validators/validators'
import defaultState from './utilities/defaultTypes'
import getAllForms from './utilities/extractDataAttributes'
import { 
  mergeObject, 
  isFunction, 
  isHTMLElement, 
  hasObjectLen,
} from './utilities/utilities'

let state = defaultState()

/** Replace the {{cond}} in a string by a given word
  * @param {String} str
  * @param {String} word
  * @param {String} interpolate
  * @return {String}
  */
function replaceInString (str, word, interpolate = '{{cond}}') {
  if (str.includes(interpolate)) {
    return str.replace(interpolate, word)
  }
  return str
}

/** Get DOM element
  * @param {HTMLElement || className} element
  * @param {HTMLElement} parent
  * @return {HTMLElement}
  */
function getDomElement (element, parent = document) {
  return isHTMLElement(element) ? element : parent.querySelector(element)
}

/** Get closest parent element with a given className
  * @param {HTMLElement} child
  * @param {String} className
  * @return {HTMLElement}
  */
function getParentEl (child, className = state.inputParentClass) {
  return child.closest(className)
}

/** Get field message
  * @param {HTMLElement} container
  * @param {String} className
  * @return {HTMLElement}
  */
function getFieldMessage (container, className = state.fieldMessageClass) {
  return container.querySelector(className)
}

/** Get input, inputParent and fieldMsg
  * @param {className || HTMLElement} field
  * @param {FormElement} form
  * @return {Object}
  */
function getElements (field, form) {
  const currentInput = getDomElement(field, form)
  const currentParent = getParentEl(currentInput, state.inputParentClass)
  const currentFieldMessage = getFieldMessage(currentParent, state.fieldMessageClass)
  return { currentInput, currentParent, currentFieldMessage }
}

/** Show (and eventually append) field message
  * @param {String || NodeElement} field
  * @param {NodeElement} form
  * @param {String} message @optionnal
  * @param {String} classToAdd @optionnal
  */
function showFieldMessage (field, form, message = '', classToAdd = state.errorClass) {
  let { 
    currentInput, 
    currentParent, 
    currentFieldMessage: fieldMsg 
  } = getElements(field, form)

  if (!fieldMsg) {
    currentParent.insertAdjacentHTML('beforeend', state.fieldMessageTemplate)
    fieldMsg = getFieldMessage(currentParent, state.fieldMessageClass)
  }

  currentParent.classList.add(classToAdd)
  fieldMsg.textContent = message
}

/** Clear field message
  * @param {String || NodeElement} field
  * @param {NodeElement} parentForm
  * @param {String} classToRemove @optionnal
  */
function clearFieldMessage (field, parentForm, classToRemove = state.errorClass) {
  let { currentInput, currentParent, currentFieldMessage } = getElements(field, parentForm)
  currentParent.classList.remove(classToRemove)
  
  if (currentFieldMessage) {
    currentFieldMessage.innerHTML = ''
  }
}

/** Check if the form contain error(s)
  * @param {className || NodeElement} form
  * @return {Boolean}
  */
function isFormValid (form) {
  const errors = form.querySelectorAll(`${state.errorClass}`)
  return !errors.length
}

/** Run validator
  * @param {Object} field
  * @param {String} attribute
  * @param {value} value
  * @return {Boolean}
  */
function runValidator (field, attribute, value) {
  if (isFunction(field[attribute])) {
    return field[attribute]
  }

  if (field.customRegex) {
    return !validators[attribute](value.trim(), field.customRegex)
  }

  return !validators[attribute](value.trim())
}

/** Validate field
  * @param {Object} fieldToValidate
  * @param {className || NodeElement} parentForm
  */
function validateField (fieldToValidate, parentForm) {
  let formHasError = false
  let { field } = fieldToValidate
  clearFieldMessage(field, parentForm)
  const { value } = getDomElement(field, parentForm)
  
  Object.keys(fieldToValidate).forEach((attribute) => {
    if (!state.noValidateAttributes.includes(attribute)) {
      formHasError = runValidator(fieldToValidate, attribute, value)
      if (formHasError) {
        showFieldMessage(field, parentForm, replaceInString(state.errorsMsg[attribute]))
      }
    }
  })
}

/** onSubmit callback for onSubmitListener method
  * @param {Event} evt
  * @param {Object} field
  * @param {className || NodeElement} submittedForm
  */
function onFieldsCallback (evt, field, submittedForm) {
  validateField(field, submittedForm)
}

/** onSubmit callback for onSubmitListener method
  * @param {Event} evt
  * @param {Array} fields
  * @param {className || NodeElement} submittedForm
  * @param {Null || Function} callback
  */
function onSubmitCallback (evt, fields, submittedForm, callback) {
  evt.preventDefault()
  fields.forEach(field => validateField(field, submittedForm))

  if (isFormValid(submittedForm) & callback) {
    if (!isFunction(callback)) {
      throw Error('FormControl - onSubmitCallback: afterValidation argument is not a function')
    }
    callback(submittedForm)
  }
}

/** Add 'submit' event listener
  * @param {HTMLElement} currentForm
  * @param {Array} fields
  * @param {Null || Function} callback
  */
function onSubmitListener (currentForm, fields, callback) {
  currentForm.addEventListener('submit', evt => onSubmitCallback(evt, fields, currentForm, callback))
}

/** Add custom event listener (@default to 'input') event listener
  * @param {HTMLElement} currentForm
  * @param {Array} fields
  * @param {Null || Function} callback
  */
function onFieldsListener (currentForm, fields, callback) {
  fields.forEach((field) => {
    const fieldEl = currentForm.querySelector(field.field)
    if (!fieldEl) {
      throw Error(`FormControl - onFieldsListener: ${field} doesn't exist`)
    }
    const evtType = field.evtType ? field.evtType : state.fieldEvent
    fieldEl.addEventListener(evtType, (evt) => onFieldsCallback(evt, field, currentForm))
  })

  if (callback) {
    
  }
}

/** Init event listeners
  * @param {Array} forms
  */
function addEventListeners (forms) {
  forms.forEach(({ form, fields, validate = null, afterValidation = null}) => {
    const currentForm = getDomElement(form)
    if (!currentForm) {
      throw Error(`FormControl - addEventListeners: ${form} doesn't exist`)
    }
    const validationType = validate ? validate : state.validationType

    if (validationType === 'onSubmit') {
      onSubmitListener(currentForm, fields, afterValidation)
    } else if (validationType === 'onFields') {
      onFieldsListener(currentForm, fields, afterValidation)
    }
  })
}

/** Init FormControl
  * @param {Array} - forms
  * @params {Object} - config
  */
export default function formControl (forms = null, config = null, useDateAttr = true) {
  let formsArray = null

  if (config && hasObjectLen(config)) {
    state = mergeObject(state, config)
  }

  console.debug(state)

  if (!forms 
    || forms && !Array.isArray(forms) 
    || forms && Array.isArray(forms) && !forms.length
    || !forms && useDateAttr) {
    formsArray = getAllForms(state.dataFormAttr, state.dataInputAttr)
  console.debug(formsArray, state)
  } else {
    formsArray = [...forms]
  }

  addEventListeners(formsArray)
}
