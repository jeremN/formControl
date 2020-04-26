const DEFAULT_ERROR_MESSAGES = {
  isEmail: 'Please enter a valid email adress',
  isPhone: 'Please enter a valid phone number',
  isUrl: 'Please enter a valid url',
  isChecked: 'This field must be checked',
  isIban: 'Your IBAN is invalid',
  isSiret: 'Your Siret is invalid',
  isBic: 'Your BIC is invalid',
  isRequired: 'This field is required',
  isNumeric: 'Value must be set to a number',
  isInteger: 'Value must be an integer',
  isEqual: 'Value must match {{cond}} field',
  isLen: 'Value must contain {{cond}} characters',
  isPassword: 'Password shoud contain 6 to 12 characters, numbers, at least one special character(@$_!%*?&), and at least one uppercase character and one lowercase',
  minLen: 'Value is too short, minimum is {{cond}} characters',
  maxLen: 'Value is too long, maximum is {{cond}} characters',
  min: 'Value is too small, minimum is {{cond}}',
  max: 'Value is too big, maximum is {{cond}}',
  quantity: 'Use digits only',
  radioIsChecked: 'You must checked one field at least',
  fileHasExtension: 'Your file is invalid, this extension is not allowed',
}

export const DEFAULT_REGEXP = {
  isName: /\d/, /* /^[a-zA-Z]{2,20}$/ */
  isEmail: /^[a-zA-Z0-9._+-]+@[a-z0-9-]{1,67}\.[a-zA-Z]{2,67}$/,
  isPhone: /^0[1-9]{1}(([0-9]{2}){4})|((\s[0-9]{2}){4})|((-[0-9]{2}){4})$/,
  isIban: /^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/,
  isBic: /([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)/,
  stringRegexp: /^\s+|<|>|"|\$|&|\/|'|\*|#|@|\\|\.\.|\./,
  isUrl: /^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU|fr|Fr|it|eng|ca)$/,
  // password 6 to 12 char, special char, lowercase & uppercase, numbers 
  isPassword:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%_*?&])[A-Za-z\d$@$_!%*?&]{6,12}/, /* /(?=^.{8,12}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/*/
  msgRegexp: /^\s+$/,
  isNumeric: /^[0-9]+$/,
  isSiret: /^[0-9]{3}[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{5}$/,
}

const DEFAULT_FILE_EXT = ['.jpg', '.jpeg', '.gif', '.png', '.webp']
const DEFAULT_ERROR_CLASS = 'has__error'
const DEFAULT_SUCCESS_CLASS = 'has__success'
const DEFAULT_FIELD_MSG_CLASS = '.form__message'
const DEFAULT_FIELD_MSG_WORDING_CLASS = '.form__message-wording'
const DEFAULT_FIELD_CLASS = '.form__control'
const DEFAULT_FIELD_PARENT_CLASS = '.form__group'

const DEFAULT_FORM_DATA_ATTR = '[data-form-control="true"]'
const DEFAULT_INPUT_DATA_ATTR = '[data-form-validators]'
const DEFAULT_INPUT_EVT_TYPE_ATTR = 'eventType'
const DEFAULT_FORM_VALIDATION_TYPE_ATTR = 'validationType'

export function defaultDataAttr () {
  return {
    formControlAttr: DEFAULT_FORM_DATA_ATTR,
    inputControlAttr: DEFAULT_INPUT_DATA_ATTR,
    validationTypeAttr: DEFAULT_FORM_VALIDATION_TYPE_ATTR,
    eventTypeAttr: DEFAULT_INPUT_EVT_TYPE_ATTR
  }
}

export default function defaultState () {
  return {
    regexp: { ...DEFAULT_REGEXP },
    errorsMsg: { ...DEFAULT_ERROR_MESSAGES },
    errorClass: DEFAULT_ERROR_CLASS,
    successClass: DEFAULT_SUCCESS_CLASS,
    inputParentClass: DEFAULT_FIELD_PARENT_CLASS,
    inputClass: DEFAULT_FIELD_CLASS,
    fieldMessageClass: DEFAULT_FIELD_MSG_CLASS,
    allowedFileExtensions: DEFAULT_FILE_EXT,
    fieldMessageTemplate: `<div class="form__message"></div>`,
    noValidateAttributes: ['field', 'rule', 'errorMsg', 'customRegex', 'evtType'],
    validationType: 'onSubmit',
    fieldEvent: 'input',
    timer: 3000,
    afterValidation: null,
    customValidators: null,
  }
}
