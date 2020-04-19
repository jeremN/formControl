import { defaultDataAttr } from './defaultTypes'

const defaultAttr = defaultDataAttr()

function splitUnderscore (strings) {
  return strings.map(str => str.split('_'))
}

function setAttrValue (value) {
  if (value === undefined || null) {
    return true
  } else if (!!isNaN(value)) {
    return value
  }
  return +value
}

function setValidatorsObject (tmpValidators) {
  let tmp = {}
  Object.keys(tmpValidators).reduce((accu, item) => {
    tmp[item] = setAttrValue(tmpValidators[item])
  }, tmp)
  return tmp
}

function extractValidatorsAttributes (input) {
  const { formValidators } = input.dataset
  const entries = splitUnderscore(formValidators.split(' '))
  const tmpValidators = Object.fromEntries(entries)
  return setValidatorsObject(tmpValidators)
}

function extractOthersAttributes (input) {
  const { [`${defaultAttr.eventTypeAttr}`]: evtType } = input.dataset
  return  {
    ...(evtType && { eventType: evtType })
  }
}

function getInputParameters (inputs) {
  let fields = []
  inputs.forEach((input) => {
    const validators = extractValidatorsAttributes(input)
    const rules = extractOthersAttributes(input)
    fields.push({
      ...validators,
      ...rules,
      field: input,
    })
  })
  return fields
}

function getFormParameters (form) {
  const { [`${defaultAttr.validationTypeAttr}`]: validType } = form.dataset
  return {
    ...(validType && { validate: validType })
  }
}

export default function getAllForms () {
  const formsElements = document.querySelectorAll(`form${defaultAttr.formControlAttr}`)
  const forms = []

  if (!formsElements) {
    throw Error('FormControl - getAllforms: no forms')
  }

  formsElements.forEach((form) => {
    const inputs = form.querySelectorAll(`${defaultAttr.inputControlAttr}`)
    const fields = getInputParameters(inputs)
    const formAttr = getFormParameters(form)
    forms.push({
      ...formAttr,
      form: form,
      fields: fields,
    })
  })
  console.debug('getAllForms', forms)
  return forms
}