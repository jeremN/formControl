const regexps = {
  nameRegExp: /\d/, /* /^[a-zA-Z]{2,20}$/ */
  emailRegexp: /^[a-zA-Z0-9._+-]+@[a-z0-9-]{1,67}\.[a-zA-Z]{2,67}$/,
  phoneRegexp: /^0[1-9]{1}(([0-9]{2}){4})|((\s[0-9]{2}){4})|((-[0-9]{2}){4})$/,
  ibanRegexp: /^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/,
  bicRegexp: /([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)/,
  stringRegexp: /^\s+|<|>|"|\$|&|\/|'|\*|#|@|\\|\.\.|\./,
  urlRegexp: /^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU|fr|Fr|it|eng|ca)$/,
  // password 6 to 12 char, special char, lowercase & uppercase, numbers 
  passwordRegexp:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%_*?&])[A-Za-z\d$@$_!%*?&]{6,12}/, /* /(?=^.{8,12}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/*/
  msgRegexp: /^\s+$/,
  numRegexp: /^[0-9]+$/,
  siretRegex: /^[0-9]{3}[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{5}$/,
}

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

export function isNumeric(value, regExp = regexps.numRegexp) {
  return regExp.test(value)
}

export function isInteger(value) {

}

export function isEqual(value, baseValue) {
  return value === baseValue
}

export function isEmail(value, regExp = regexps.emailRegexp) {
  return regExp.test(value)
}

export function isPassword(value, regExp = regexps.passwordRegexp) {
  return (value.length > 0 && regExp.test(value)
}

export function isPhone(value, regExp = regexps.phoneRegexp) {
  return regExp.test(value)
}

export function isIban(value, regExp = regexps.ibanRegexp) {
  return regExp.test(value)
}

export function isBic(value, regExp = regexps.bicRegexp) {
  return regExp.test(value)
}

export function isUrl(value, regExp = regexps.urlRegexp) {
  return regExp.test(value)
}

export function isChecked(field) {
  return field.checked
}

export function radioIsChecked(array) {
    for(let i = 0; i < array.length; i += 1) {
      if (isChecked(array[i])) {
        return true
      }
    }
    return false
  }
}