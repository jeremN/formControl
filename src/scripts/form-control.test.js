import formControl, { getCurrentState } from './form-control'
import defaultState from './utilities/defaultTypes.js'

describe('FormControl should works if i use data-attr', () => {
  beforeAll(() => {
    const html = `
      <form 
        class="form js__form__control--2" 
        data-form-control="true"
        data-validation-type="onSubmit">
        <div class="form__group js__test-custom-validator">
          <label for="name2">Name</label>
          <input 
            id="text2" 
            class="form__field" 
            type="text"
            value="2"
            data-form-validators="isNotEqualTwo"
            data-error-msg-is-not-equal-two="Field should not be equal to two"/>
          <div class="form__message"></div>
        </div>
        <div class="form__group js__test-message">
          <label for="name2">Name</label>
          <input 
            id="name2" 
            class="form__field" 
            type="text"
            data-form-validators="isRequired minLen_4 maxLen_12"/>
        </div>
        <div class="form__group">
          <label for="password">Password</label>
          <input 
            id="password" 
            name="password"
            class="form__field" 
            type="password"
            data-form-validators="isPassword"/>
        </div>
        <div class="form__group">
          <label for="password2">Password</label>
          <input 
            id="password2" 
            name="password2"
            class="form__field" 
            type="password"
            data-form-validators="isEqual_#password"/>
        </div>
        <div class="form__group js__test-custom-msg">
          <label for="isNumber">Integer</label>
          <input 
            id="isNumber" 
            class="form__field" 
            type="text"
            data-form-validators="isInteger"
            data-error-msg-is-integer="Test custom error"/>
        </div>
        <div class="form__group">
          <label for="number2">Number</label>
          <input 
            id="number2" 
            class="form__field" 
            type="number" 
            data-form-validators="isRequired"/>
          <div class="form__message"></div>
        </div>
        <div class="form__group">
          <label for="phone2">Phone</label>
          <input 
            id="phone2" 
            class="form__field" 
            type="text"
            data-form-validators="isPhone"/>
          <div class="form__message"></span></div>
        </div>
        <div class="form__group">
          <label for="email2">Email</label>
          <input 
            id="email2" 
            class="form__field" 
            type="text"
            data-form-validators="isEmail"/>
          <div class="form__message"></span></div>
        </div>
        <div class="form__group">
          <label for="siret2">Siret</label>
          <input 
            id="siret2" 
            class="form__field" 
            type="text"
            data-form-validators="isSiret"/>
          <div class="form__message"></div>
        </div>
        <div class="form__group">
          <label for="bic2">Bic</label>
          <input 
            id="bic2" 
            class="form__field" 
            type="text"
            data-form-validators="isBic"/>
          <div class="form__message"></div>
        </div>
        <div class="form__group">
          <label for="iban2">Iban</label>
          <input 
            id="iban2" 
            class="form__field" 
            type="text"
            data-form-validators="isIban"/>
          <div class="form__message"></div>
        </div>
        <div class="form__group">
          <label for="url2">URL</label>
          <input 
            id="url2" 
            class="form__field" 
            type="url"
            data-form-validators="isUrl"/>
          <div class="form__message"></div>
        </div> 
        <div class="form__group">
          <label for="select2">Select</label>
          <select id="select2" data-form-validators="isRequired">
            <option value="">Make a choice</option>
            <option value="1">1</option>
          </select>
          <div class="form__message"></div>
        </div> 
        <div class="form__group">
          <label for="checking2">Checked</label>
          <input 
            id="checking2" 
            class="form__field" 
            type="checkbox"
            data-form-validators="isChecked"/>
          <div class="form__message"></div>
        </div>  
        <div class="form__group form__group--row">
          <button type="submit">Send</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    `
    document.body.insertAdjacentHTML('afterbegin', html)
    const customState = {
      customValidators: {
        isNotEqualTwo: (value) => {
          value !== 2
        }
      }
    }
    formControl(null, customState)
    const submitBtn = document.querySelector('button[type="submit"]')
    submitBtn.click()
  })
  
  afterAll(() => {
    document.body.innerHTML = ''
  })

  it('should have append an error div if parent div has no one', () => {
    const testDivMsg = document.querySelector('.js__test-message > .form__message')
    expect(testDivMsg).not.toBeNull()
    expect(testDivMsg).not.toBeUndefined()
  })

  it('should show an error message if validators return false', () => {
    const testErrorClass = document.querySelector('.js__test-message')
    expect(testErrorClass.classList.contains('has__error')).toBe(true)
  })

  it('should return my custom error message if i use data-error-msg-my-attribute', () => {
    const customMsg = document.querySelector('.js__test-custom-msg > .form__message')
    expect(customMsg.textContent).toMatch('Test custom error')
  })

  it('should use my custom validator if i add one', () => {
    const customValidator = document.querySelector('.js__test-custom-validator > .form__message')
    const currentState = getCurrentState()
    expect(currentState.customValidators.isNotEqualTwo).not.toBeNull()
    expect(currentState.customValidators.isNotEqualTwo).not.toBeUndefined()
    expect(currentState.customValidators).not.toBeNull()
    expect(customValidator.textContent).toMatch('Field should not be equal to two')
  })
})