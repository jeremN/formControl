import * as validators from './validators.js'

describe('Validators tests', () => {

  it('required should return true if value is defined and not empty', () => {
    let required = validators.isRequired('test')
    expect(required).toBe(true)
  })

  it('required should return false if value is not defined or empty', () => {
    let required = validators.isRequired()
    expect(required).toBe(false)
  })

  it('isLen should return true if value has specified length', () => {
    let isLength = validators.isLen('test', 4)
    expect(isLength).toBe(true)
  })

  it('isLen should return false if value length is different from specified', () => {
    let isLength = validators.isLen('test', 2)
    expect(isLength).toBe(false)
  })

  it('minLen should return true if value is >= specified length', () => {
    let hasMinLength = validators.minLen('test', 2)
    let isEqualMinLength = validators.minLen('test', 4)
    expect(hasMinLength).toBe(true)
    expect(isEqualMinLength).toBe(true)
  })

  it('minLen should return false if value is < specified length', () => {
    let hasMinLength = validators.minLen('test', 5)
    expect(hasMinLength).toBe(false)
  })

  it('maxLen should return true if value is <= specified length', () => {
    let hasMaxLength = validators.maxLen('test', 5)
    let isEqualMaxLength = validators.maxLen('test', 4)
    expect(hasMaxLength).toBe(true)
    expect(isEqualMaxLength).toBe(true)
  })

  it('maxLen should return false if value is > specified length', () => {
    let hasMaxLength = validators.maxLen('test', 3)
    expect(hasMaxLength).toBe(false)
  })

  it('isNumeric should return true if value is numeric', () => {
    let isNumeric = validators.isNumeric(5)
    expect(isNumeric).toBe(true)
  })

  it('isNumeric should return false if value is not numeric', () => {
    let isNumeric = validators.isNumeric('test')
    expect(isNumeric).toBe(false)
  })

  it('isEmail should return true if value is a valid email address', () => {
    let isEmailType = validators.isEmail('toto@to.fr')
    expect(isEmailType).toBe(true)
  })

  it('isEmail should return false if value is not valid email address', () => {
    let isEmailType = validators.isEmail('toto')
    expect(isEmailType).toBe(false)
  })

  // regex password => 6 to 12 char, special char, lowercase & uppercase, numbers 
  it('isPassword should return true if value is a valid password', () => {
    let isPasswordType = validators.isPassword('23Te_sts')
    expect(isPasswordType).toBe(true)
  })

  it('isPassword should return false if value is not a valid password', () => {
    let isPasswordType = validators.isPassword('toto')
    expect(isPasswordType).toBe(false)
  })

  it('isPhone should return true if value is a valid phone number', () => {
    let isPhoneType = validators.isPhone('0601020304')
    expect(isPhoneType).toBe(true)
  })

  it('isPhone should return false if value is not a valid phone number', () => {
    let isPhoneType = validators.isPhone('toto')
    expect(isPhoneType).toBe(false)
  })

  it('isIban should return true if value is a valid IBAN', () => {
    let isIbanType = validators.isIban('FR7630001007941234567890185')
    expect(isIbanType).toBe(true)
  })

  it('isIban should return false if value is not a valid IBAN', () => {
    let isIbanType = validators.isIban('FR54513214')
    expect(isIbanType).toBe(false)
  })

  it('isBic should return true if value is a valid BIC', () => {
    let isBicType = validators.isBic('DSBACNBXSHA')
    expect(isBicType).toBe(true)
  })

  it('isBic should return false if value is not a valid BIC', () => {
    let isBicType = validators.isBic('DSB4CNBXSHA')
    expect(isBicType).toBe(false)
  })

  it('isUrl should return true if value is a valid url', () => {
    let isUrlType = validators.isUrl('www.google.fr')
    expect(isUrlType).toBe(true)
  })

  it('isUrl should return false if value is not a valid url', () => {
    let isUrlType = validators.isUrl('google')
    expect(isUrlType).toBe(false)
  })
})

describe('Test validators isEqual', () => {
  let inputs = `
    <input type="password" name="password" id="password-1" />
  `
  let password = null

  beforeAll(() => {
    document.body.insertAdjacentHTML('afterbegin', inputs)
    password = document.querySelector('#password-1')
  })

  afterAll(() => {
    document.body.innerHTML = ''
    password = null
  })
  
  it('isEqual should return true if value is equal to specified value', () => {
    password.value = 'toto'
    let isEqualTo = validators.isEqual('toto', '#password-1')
    expect(isEqualTo).toBe(true)
  })

  it('isEqual should return false if value is not equal to specified value', () => {
    password.value = 'test'
    let isEqualTo = validators.isEqual('toto', '#password-1')
    expect(isEqualTo).toBe(false)
  })

  it('isEqual should work with complex values', () => {
    password.value = '23Te_sts'
    let isEqualTo = validators.isEqual('23Te_sts', '#password-1')
    let isEqualToBis = validators.isEqual('23Te%sts', '#password-1')
    expect(isEqualTo).toBe(true)
    expect(isEqualToBis).toBe(false)
  })
})

describe('Test validators input checkbox', () => {
  let input = null

  beforeEach(() => {
    input = document.createElement('input')
    input.type = "checkbox"
    document.body.appendChild(input)
  })

  afterEach(() => {
    document.body.innerHTML = ''
    input = null
  })


  it('isChecked should return true if checkbox is checked', () => {
    input.checked = true
    let checkboxIsChecked = validators.isChecked(input)
    expect(checkboxIsChecked).toBe(true)
  })

  it('isChecked should return false if checkbox is not checked', () => {
    input.checked = false
    let checkboxIsChecked = validators.isChecked(input)
    expect(checkboxIsChecked).toBe(false)
  })
})

describe('Test validators input radio', () => {
  let inputs = null

  beforeEach(() => {
    inputs = `
      <input type="radio" />
      <input type="radio" checked="true" />
      <input type="radio" />
    `

    document.body.insertAdjacentHTML('afterbegin', inputs)
  })

  afterEach(() => {
    document.body.innerHTML = ''
    inputs = null
  })

  it('radioIsChecked should return true if at least one radio input is checked', () => {
    const radios = document.querySelectorAll('input')
    let oneRadioIsChecked = validators.radioIsChecked(radios)
    expect(oneRadioIsChecked).toBe(true)
  })

  it('radioIsChecked should return false if no radio input is checked', () => {
    document.querySelector('input[checked="true"]').checked = false
    const radios = document.querySelectorAll('input')
    let oneRadioIsChecked = validators.radioIsChecked(radios)
    expect(oneRadioIsChecked).toBe(false)
  })
})