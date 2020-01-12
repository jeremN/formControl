import '../sass/style.scss'

import * from './validators/validators.js'

const messages = {
  email: 'Please enter a valid email adress',
  isRequired: 'This field is required',
  minLen: 'Value is too short, minimum is {{cond}} characters.',
  maxLen: 'Value is too long, maximum is {{cond}} characters.',
  min: 'Value is too small, minimum is {{cond}}.',
  max: 'Value is too big, maximum is {{cond}}.',
  quantity: 'Use digits only.',
  number: 'Value must be set to a number',
  int: 'Value must be an integer',
  length: 'Value must contain {{cond}} characters',
  eq: 'Value must match {{cond}} field'
}

const DEFAULT_ERROR_CLASS = 'has__error'
const DEFAULT_FIELD_MESSAGE_CLASS = 'form__message'
const DEFAULT_FIELD_CLASS = 'form__control'
const DEFAULT_FIELD_PARENT_CLASS = 'form__group'
const DEFAULT_DATA_ATTR = 'form-control'
const DEFAULT_DATA_VALIDATOR = 'form-validators'

function isHTMLElement(node) {
  return node instanceof HTMLElement
}

function replaceInString(str, word, interpolate = '{{cond}}') {
  if (str.includes(interpolate)) {
    return str.replace(interpolate, word)
  }
  return str
}

function showErrorMsg(field, errorMsg) {
  const inputEl = isHTMLElement(field) ? field : document.querySelector(field)
  const fieldParent = inputEl.closest(`.${DEFAULT_FIELD_PARENT_CLASS}`) || inputEl.parentElement
  let fieldMessage = fieldParent.querySelector(`.${DEFAULT_FIELD_MESSAGE_CLASS}`)
  
  if (!fieldMessage) {
    const divMessage = `<div class="${DEFAULT_FIELD_MESSAGE_CLASS}"></div>`
    fieldParent.insertAdjacentHTML('beforeend', divMessage)
    fieldMessage = fieldParent.querySelector(`.${DEFAULT_FIELD_MESSAGE_CLASS}`)
  }
  
  inputEl.classList.add(`${DEFAULT_ERROR_CLASS}`)
  fieldMessage.innerHTML = errorMsg
}

function clearErrorMsg(field) {
  const inputEl = isHTMLElement(field) ? field : document.querySelector(field)
  const fieldParent = inputEl.closest(`.${DEFAULT_FIELD_PARENT_CLASS}`) || inputEl.parentElement
  let fieldMessage = fieldParent.querySelector(`.${DEFAULT_FIELD_MESSAGE_CLASS}`)
  inputEl.classList.remove(`${DEFAULT_ERROR_CLASS}`)
  
  if(fieldMessage) {
    fieldMessage.innerHTML = ''
  }
}

function getInputValue(field) {
  return document.querySelector(field).value.trim()
}

function formIsValid(form) {
  const errors = form.querySelectorAll(`.${DEFAULT_ERROR_CLASS}`)
  return !errors.length
}

function splitUnderscore(strings) {
  return strings.map(str => str.split('_'))
}

function setAttrValue(value) {
  if (value === undefined || null) {
    return true
  } else if (!isNaN(value)) {
    return +value
  }
}

function setValidatorsObject(tmpValidators) {
  let tmp = {}
  Object.keys(tmpValidators).reduce((accu, item) => {
    tmp[item] = setAttrValue(tmpValidators[item])
  }, tmp)
  return tmp
}

function extractAttributes(input) {
  const { formValidators } = input.dataset
  const tmpValidators = Object.fromEntries(splitUnderscore(formValidators.split(' ')))
  return setValidatorsObject(tmpValidators)
}

function getParameters(inputs) {
  let fields = []
  inputs.forEach((input) => {
    const validators = extractAttributes(input)
    fields.push({
      ...validators,
      field: input,
    })
  })
  return fields
}

function getAllForms() {
  const formsElements = document.querySelectorAll('form[data-form-control="true"]')
  const forms = []
  formsElements.forEach((form) => {
    const inputs = form.querySelectorAll('[data-form-validators]')
    const fields = getParameters(inputs)
    forms.push({
      form: form,
      fields: fields,
    })
  })
  
  return forms
}

function validateField(field) {
  let formHasError = false
  let input = field.field
  clearErrorMsg(input)
  
  Object.keys(field).forEach(parameter => {
    let { value } = input
    
    if (parameter !== 'field'){
    	console.log(parameter)
      formHasError = !window[parameter](value.trim())
      if (formHasError) {
        console.log('formHasError', messages[parameter], field[parameter])
        showErrorMsg(input, replaceInString(messages[parameter], field[parameter]))
      }
    }
  })
}

function onSubmit(evt, fields, afterValidation = null) {
  evt.preventDefault()
  fields.forEach(validateField)
}

function setListeners(forms) {
  forms.forEach((formObj) => {
    formObj.form.addEventListener('submit', (evt) => onSubmit(evt, formObj.fields))
  })
}

/**
  * @param {Array} - forms
  * @params {Object} - config
  */
function formControl(forms, config) {
  let formsArray = forms

  if (!forms || !Array.isArray(forms) || !forms.length) {
    formsArray = getAllForms()
  }
  setListeners(formsArray)
}

formControl()