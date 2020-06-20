import * as validators from './validators/validators'
import defaultState from './utilities/defaultTypes'
import getAllForms from './utilities/extractDataAttributes'
import { 
  updateState, 
  isFunction, 
  isHTMLElement, 
  hasObjectLen,
  capitalize,
} from './utilities/utilities'

let state = defaultState()

/** Toggle aria-invalid attribute to field with an error 
  * @param {HTMLElement || className} input
  * @param {Boolean} hasError
  */
function setInputAriaAttributes (input, hasError = false) {
  const field = isHTMLElement(input) ? input : document.querySelector(input)
  field.setAttribute('aria-invalid', hasError)
}

/** Set role and aria-live attribute to field message 
  * @param {HTMLElement} fieldMsg
  * @param {Boolean} isErrorMsg
  */
function setFieldMsgAriaAttributes (fieldMsg, isErrorMsg = false) {
  fieldMsg.setAttribute('role', isErrorMsg ? 'alert' : 'status')
  fieldMsg.setAttribute('aria-live', isErrorMsg ? 'assertive' : 'polite')
}

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
  const hasError = classToAdd === state.errorClass

  if (!fieldMsg) {
    currentParent.insertAdjacentHTML('beforeend', state.fieldMessageTemplate)
    fieldMsg = getFieldMessage(currentParent, state.fieldMessageClass)
  }

  currentParent.classList.add(classToAdd)
  setInputAriaAttributes(currentInput, hasError)
  setFieldMsgAriaAttributes(fieldMsg, hasError)
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
  const errors = form.querySelectorAll(state.errorClass)
  if (errors.length) {
    errors[0].querySelector(state.inputClass).focus()
  }
  return !errors.length
}

/** Run validator
  * @param {Object} field
  * @param {String} attribute
  * @param {value} value
  * @return {Boolean}
  */
function runValidator (field, attribute, value) {
  // if a custom validator or validator function is provided
  if (isFunction(field[attribute])) {
    return !field[attribute](value.trim(), field)
  }

  // if custom validator AND custom regex are provided
  if (field.customRegex && isFunction(validators[attribute])) {
    if (!hasObjectLen(field.customRegex)) {
      throw Error('FormControl - runValidator: customRegex properties must be an object')
    }
    return !validators[attribute](value.trim(), field.customRegex[attribute])
  }

  // if custom validators is provided in state AND this validators exist
  if (hasObjectLen(state.customValidators) && state.customValidators[attribute]){
    if (!isFunction(state.customValidators[attribute])) {
      throw Error(`FormControl - customValidators: customValidators[${attribute}] must be a function`)
    }
    return !state.customValidators[attribute](value.trim(), field)
  }

  // to validate file extension
  if (attribute === 'fileHasExtension') {
    return !validators[attribute](value.trim(), state.allowedFileExtensions)
  }

  // if validator attribute is not a boolean (like isEqual validator)
  if (typeof field[attribute] !== 'boolean') {
    return !validators[attribute](value.trim(), field[attribute])
  }

  // to validate a list of input radio and one must be checked
  if (attribute === 'radioIsChecked') {
    const { name } = field.field
    const inputsToValidate = [...getParentEl(field.field).querySelectorAll(`input[name="${name}"]`)]
    return !validators[attribute](inputsToValidate)
  }

  // to validate a checkbox input or a single radio
  if (attribute === 'isChecked') {
    return !validators[attribute](field.field)
  }

  return !validators[attribute](value.trim())
}

/** Get error message
  * @param {HTMLElement} input
  * @param {String} attribute
  * @param {Object} errorsOptions
  * @return {String}
  */
function getErrorMessage (input, attribute, errorsOptions) {
  const { [`errorMsg${capitalize(attribute)}`]: customError } = input.dataset

  if (errorsOptions && errorsOptions[attribute]) {
    return errorsOptions[attribute]
  }

  if (customError) {
    return customError
  }

  return state.errorsMsg[attribute]
}

/** Validate field
  * @param {Object} fieldToValidate
  * @param {className || NodeElement} parentForm
  */
function validateField (fieldToValidate, parentForm) {
  let formHasError = false
  let { field, errorMsg = null } = fieldToValidate
  clearFieldMessage(field, parentForm)
  const input = getDomElement(field, parentForm)
  
  Object.keys(fieldToValidate).forEach((attribute) => {
    if (!state.noValidateAttributes.includes(attribute)) {
      formHasError = runValidator(fieldToValidate, attribute, input.value)

      if (formHasError) {
        const message = getErrorMessage(input, attribute, errorMsg)
        showFieldMessage(field, parentForm, replaceInString(message, fieldToValidate[attribute]))
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
  if (!state.noValidateKeys.includes(evt.key)) {
    validateField(field, submittedForm)
  }
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
    callback(submittedForm, fields)
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
    onSubmitListener(currentForm, fields, callback)
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

export function getCurrentState () {
  return state
}

/** Init FormControl
  * @param {Array} - forms
  * @params {Object} - config
  */
export default function formControl (forms = null, config = null, useDateAttr = true) {
  let formsArray = null

  if (config && hasObjectLen(config)) {
    state = updateState(state, config)
  }

  if (!forms 
    || forms && !Array.isArray(forms) 
    || forms && Array.isArray(forms) && !forms.length
    || !forms && useDateAttr) {
    formsArray = getAllForms()
  } else {
    formsArray = [...forms]
  }

  addEventListeners(formsArray)
}
