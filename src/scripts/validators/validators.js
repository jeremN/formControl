import { DEFAULT_REGEXP } from '../utilities/defaultTypes'

//https://stackoverflow.com/questions/4234589/validation-of-file-extension-before-uploading-file
export function fileHasExtension(value, extension) {
  return (new RegExp('(' + extension.join('|').replace(/\./g, '\\.') + ')$', "i")).test(value);
}

export function isSiret(value) {
  const siret = value.replace(/\s/g, '')

  if (siret.length !== 14 || isNaN(siret)) return false

  let sum = 0
  let tmp = 0

  for (let i = 0; i < 14; i++) {
    if (i % 2 == 0) {
      tmp = parseInt(siret[i], 10) * 2
      tmp = tmp > 9 ? tmp - 9 : tmp
    } else {
      tmp = parseInt(siret[i], 10)
    }

    sum += tmp
  }

  return (sum % 10 !== 0)
}

export function isRequired(value) {
  if (value == (null || undefined)) return false
  return value.length > 0
}

export function isLen(value, len) {
  return value.length === len
}

export function minLen(value, minLength) {
  return value.length >= minLength
}

export function maxLen(value, maxLength) {
  return value.length <= maxLength
}

export function min(value, min) {
  return value >= mi
}

export function max(value, max) {
  return value <= max
}

export function isNumeric(value, regExp = DEFAULT_REGEXP.isNumeric) {
  return !isNaN(value) && regExp.test(value)
}

export function isInteger(value) {
  return Number.isInteger(value)
}

export function isEqual(value, element) {
  const baseEl = document.querySelector(`[name="${element}"]`)
  return value === baseEl.value && baseEl.value.length > 0
}

export function isEmail(value, regExp = DEFAULT_REGEXP.isEmail) {
  return regExp.test(value)
}

export function isPassword(value, regExp = DEFAULT_REGEXP.isPassword) {
  return (value.length > 0 && regExp.test(value))
}

export function isPhone(value, regExp = DEFAULT_REGEXP.isPhone) {
  return regExp.test(value)
}

export function isIban(value, regExp = DEFAULT_REGEXP.isIban) {
  return regExp.test(value)
}

export function isBic(value, regExp = DEFAULT_REGEXP.isBic) {
  return regExp.test(value)
}

export function isUrl(value, regExp = DEFAULT_REGEXP.isUrl) {
  return regExp.test(value)
}

export function isChecked(field) {
  return field.checked
}

export function radioIsChecked(array) {
  for (let i = 0; i < array.length; i += 1) {
    if (isChecked(array[i])) {
      return true
    }
  }
  return false
}