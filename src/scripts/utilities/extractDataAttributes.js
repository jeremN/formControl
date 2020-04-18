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

function extractAttributes (input) {
  const { formValidators } = input.dataset
  const entries = splitUnderscore(formValidators.split(' '))
  const tmpValidators = Object.fromEntries(entries)
  return setValidatorsObject(tmpValidators)
}

function getParameters (inputs) {
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

export default function getAllForms (formControlAttr, inputControlAttr) {
  const formsElements = document.querySelectorAll(`form${formControlAttr}`)
  const forms = []

  formsElements.forEach((form) => {
    const inputs = form.querySelectorAll(`${inputControlAttr}`)
    const fields = getParameters(inputs)
    forms.push({
      form: form,
      fields: fields,
    })
  })
  
  return forms
}