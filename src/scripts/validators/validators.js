import { DEFAULT_REGEXP } from '../utilities/defaultTypes'

//https://stackoverflow.com/questions/4234589/validation-of-file-extension-before-uploading-file
export function fileHasExtension(value, extension) {
  // const { value: fileName } = document.querySelector(field)
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
  return value.length > 0
}

export function isLen(value, len) {
  return value.length === len
}

export function minLen(value, minLength) {
  return value.length < minLength
}

export function maxLen(value, maxLength) {
  return value.length > maxLength
}

export function isNumeric(value, regExp = DEFAULT_REGEXP.numRegexp) {
  return regExp.test(value)
}

export function isInteger(value) {

}

export function isEqual(value, baseValue) {
  return value === baseValue
}

export function isEmail(value, regExp = DEFAULT_REGEXP.emailRegexp) {
  return regExp.test(value)
}

export function isPassword(value, regExp = DEFAULT_REGEXP.passwordRegexp) {
  return (value.length > 0 && regExp.test(value))
}

export function isPhone(value, regExp = DEFAULT_REGEXP.phoneRegexp) {
  return regExp.test(value)
}

export function isIban(value, regExp = DEFAULT_REGEXP.ibanRegexp) {
  return regExp.test(value)
}

export function isBic(value, regExp = DEFAULT_REGEXP.bicRegexp) {
  return regExp.test(value)
}

export function isUrl(value, regExp = DEFAULT_REGEXP.urlRegexp) {
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