export const DEFAULT_ERROR_MESSAGES = {
  isEmail: 'Please enter a valid email adress',
  isPhone: 'Please enter a valid phone number',
  isUrl: 'Please enter a valid url',
  isChecked: 'This field must be checked',
  isIban: 'Your IBAN is invalid',
  isSiret: 'Your Siret is invalid',
  isBic: 'Your BIC is invalid',
  isRequired: 'This field is required',
  minLen: 'Value is too short, minimum is {{cond}} characters.',
  maxLen: 'Value is too long, maximum is {{cond}} characters.',
  min: 'Value is too small, minimum is {{cond}}.',
  max: 'Value is too big, maximum is {{cond}}.',
  quantity: 'Use digits only.',
  isNumeric: 'Value must be set to a number',
  int: 'Value must be an integer',
  length: 'Value must contain {{cond}} characters',
  eq: 'Value must match {{cond}} field'
}

export const DEFAULT_REGEXP = {
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

export const DEFAULT_ERROR_CLASS = 'has__error'
export const DEFAULT_FIELD_MESSAGE_CLASS = 'form__message'
export const DEFAULT_FIELD_CLASS = 'form__control'
export const DEFAULT_FIELD_PARENT_CLASS = 'form__group'
export const DEFAULT_DATA_ATTR = 'form-control'
export const DEFAULT_DATA_VALIDATOR = 'form-validators'