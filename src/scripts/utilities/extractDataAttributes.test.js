import getAllForms from './extractDataAttributes.js';

describe('FormControl should extract the forms array if i use data-attr', () => {
  beforeAll(() => {
    const html = `
      <form 
        class="form js__form__control--2" 
        data-form-control="true"
        data-validation-type="onSubmit">
        <div class="form__group">
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
        <div class="form__group">
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
  })
  
  afterAll(() => {
    document.body.innerHTML = ''
  })

  it('should return the expected array', () => {
    const expected = [
      {
        form: document.querySelector('.js__form__control--2'),
        validate: 'onSubmit',
        fields: [
          { isRequired: true, minLen: 4, maxLen: 12, field: document.querySelector('#name2') },
          { isPassword: true, field: document.querySelector('#password') },
          { isEqual: "#password", field: document.querySelector('#password2') },
          { isInteger: true, field: document.querySelector('#isNumber') },
          { isRequired: true, field: document.querySelector('#number2') },
          { isPhone: true, field: document.querySelector('#phone2') },
          { isEmail: true, field: document.querySelector('#email2') },
          { isSiret: true, field: document.querySelector('#siret2') },
          { isBic: true, field: document.querySelector('#bic2') },
          { isIban: true, field: document.querySelector('#iban2') },
          { isUrl: true, field: document.querySelector('#url2') },
          { isRequired: true, field: document.querySelector('#select2') },
          { isChecked: true, field: document.querySelector('#checking2') }        
        ]
      }
    ]
    const forms = getAllForms()
    expect(forms).toMatchObject(expected)
    expect(forms).toHaveLength(1)
  })

  it('should return an array with length of two', () => {
    const formBis = `
      <form class="form js__form__control--3" data-form-control="true">
        <div class="form__group">
          <label for="name3">Name</label>
          <input 
            id="name3" 
            class="form__field" 
            type="text"
            data-form-validators="isRequired minLen_4 maxLen_12"/>
        </div>
        <div class="form__group">
          <label for="password">Password</label>
          <input 
            id="password3" 
            name="password"
            class="form__field" 
            type="password"
            data-form-validators="isPassword"/>
        </div>
        <div class="form__group">
          <label for="passwordRepeat3">Password</label>
          <input 
            id="passwordRepeat3" 
            name="password3"
            class="form__field" 
            type="password"
            data-form-validators="isEqual_#password3"/>
        </div>
        <div class="form__group">
          <label for="isNumber3">Integer</label>
          <input 
            id="isNumber3" 
            class="form__field" 
            type="text"
            data-form-validators="isInteger"
            data-error-msg-is-integer="Test custom error"/>
        </div>
        <div class="form__group">
          <label for="number3">Number</label>
          <input 
            id="number3" 
            class="form__field" 
            type="number" 
            data-form-validators="isRequired"/>
          <div class="form__message"></div>
        </div>
        <div class="form__group">
          <label for="phone3">Phone</label>
          <input 
            id="phone3" 
            class="form__field" 
            type="text"
            data-form-validators="isPhone"/>
          <div class="form__message"></span></div>
        </div>
        <div class="form__group">
          <label for="email3">Email</label>
          <input 
            id="email3" 
            class="form__field" 
            type="text"
            data-form-validators="isEmail"/>
          <div class="form__message"></span></div>
        </div>
        <div class="form__group">
          <label for="siret3">Siret</label>
          <input 
            id="siret3" 
            class="form__field" 
            type="text"
            data-form-validators="isSiret"/>
          <div class="form__message"></div>
        </div>
        <div class="form__group">
          <label for="bic3">Bic</label>
          <input 
            id="bic3" 
            class="form__field" 
            type="text"
            data-form-validators="isBic"/>
          <div class="form__message"></div>
        </div>
        <div class="form__group">
          <label for="iban3">Iban</label>
          <input 
            id="iban3" 
            class="form__field" 
            type="text"
            data-form-validators="isIban"/>
          <div class="form__message"></div>
        </div>
        <div class="form__group">
          <label for="url3">URL</label>
          <input 
            id="url3" 
            class="form__field" 
            type="url"
            data-form-validators="isUrl"/>
          <div class="form__message"></div>
        </div> 
        <div class="form__group">
          <label for="select3">Select</label>
          <select id="select3" data-form-validators="isRequired">
            <option value="">Make a choice</option>
            <option value="1">1</option>
          </select>
          <div class="form__message"></div>
        </div> 
        <div class="form__group">
          <label for="checking3">Checked</label>
          <input 
            id="checking3" 
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
    document.body.insertAdjacentHTML('beforeend', formBis)
    const forms = getAllForms()
    expect(forms).toHaveLength(2)
  })
})
