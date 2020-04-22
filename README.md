# Form Validation with Javascript (es6+)

### Install

### Usage

1. Using data-attributes

```html
<body>
  <form class="form js__form__control--2" data-form-control="true">
      <div class="form__group">
        <label for="name2">Name</label>
        <input 
          id="name2" 
          class="form__field" 
          type="text"
          data-form-validators="isRequired minLen_4 maxLen_12"/>
      </div>
      <div class="form__group form__group--row">
        <button type="submit">Send</button>
      </div>
  </form>
</body>

<script>
  import formControl from './form-control';

  formControl()
</script>
```

2. Using an object
```html
<body>
  <form class="form js__form__control">
      <div class="form__group">
        <label for="name2">Name</label>
        <input 
          id="name2" 
          class="form__field" 
          type="text"/>
      </div>
      <button type="submit">Send</button>
  </form>
</body>
<script>
  import formControl from './form-control';

  const forms = [ 
    {
      form: '.js__form__control--2',
      fields: [
        {
          field: '#name2',
          isRequired: true,
          minLen: 4,
          maxLen: 12,
        }, {
          field: '#number2',
          isRequired: true,
        }, {
          field: '#phone2',
          isPhone: true,
        }, {
          field: '#email2',
          isEmail: true,
        }, {
          field: '#siret2',
          isSiret: true,
        }, {
          field: '#bic2',
          isBic: true,
        }, {
          field: '#iban2',
          isIban: true,
        }, {
          field: '#url2',
          isUrl: true,
        }, {
          field: '#checking2',
          isChecked: true,
        },
      ]
    },
  ]

  formControl(forms)  
</script>
```

3. Adding custom validators

4. Changing validation Type

5. Adding custom event type


### Forms object

| Name | Type | Description | Default (if applicable) | Example |
|------|------|-------------|-------------------------|---------|
| `form` | String | Form selector (ID, className...) |  | '.js__form__control--1' |
| `validate` | String | Validation type used by FormControl (two possible value: 'onSubmit', 'onFields') | 'onSubmit' | 'onSubmit' |
| `fields` | Array | Fields to validate |  | [{ field: '#number', isRequired: true }] |


### Field object

| Name | Type | Description | Example |
|------|------|-------------|---------|
| `field` | String | Input selector (ID, className...) | '#name' |
| `validatorsName` | Boolean or Value or String | Validator applied to field (see Validators below) | minLen: 4 |
| `errorsMsg` | Object | Custom errors message | errorsMsg: { minLen: 'my custom error msg {{cond}}' } |
| `evtType` | String | Event applied to field event listener (if validationType = 'onFields') | evtType: 'keyup' | 


### Config object

| Name | Type | Description | Default |
|------|------|-------------|---------|
| `regexp` | Object | Regex used by some validators | see Default regex |
| `errorsMsg` | Object | Errors message showed when validators return false | see Default error messages |
| `errorClass` | String | Default error class added to container | `has__error` |
| `successClass` | String | Default success class added to container | `has__success` |
| `inputParentClass` | String | ClassName used by input parent container | `.form__group` |
| `inputClass` | String | ClassName used by input field | `.form__control` |
| `fieldMessageClass` | String | ClassName used by field message element | `.form__message` |
| `allowedFileExtensions` | Array | Allowed file extension used by validators for input[type="file"] | `['.jpg', '.jpeg', '.gif', '.png', '.webp']` |
| `fieldMessageTemplate` | Template string | Error field template used to display error/message message | `<div class="form__message"></div>` | 
| `noValidateAttributes` | Array | This attributes will not be used by runValidators method | `['field', 'rule']` 
| `validationType` | Object | Type of validation used by FormControl | `onSubmit` 
| `fieldEvent` | Object | Default field event for 'onFields' validation listener | `input` 
| `timer` | Object | Debounce timer for field type validation | `null` 
| `afterValidation` | Function | Function called after submit validation (if form has no error) | `null` |
| `customValidators` | Object | An object containing your custom validators functions | `null` |


### Data-attributes

| Name | Description | Example |
|------|-------------|---------|
| `[data-form-control="true"]` | Form with this data-attr will be processed by FormControl | '<form [data-form-control="true"]></form>'
| `[data-form-validators]` | Apply validation rules on input | '<input type="text" data-form-validators="isRequired minLen_4"/>' |
| `[data-validation-type]` | Modify validator event listener on form | '<form data-validation-type="onSubmit"></form>' |
| `[data-event-type]` | Apply custom event listener on input event listener | '<input type="text" data-event-type="keyup"/>' |
| `[data-error-msg-my-validator-name]` | Apply custom error message on input | '<input type="text" data-error-msg-is-required="my custom error message"/>' |


### Validators:

| Name | Description | Example | 
|------|-------------|---------| 
| `isRequired` | Field isn't empty | isRequired | 
| `isEmail` | Field is email | isEmail | 
| `isSiret` | Field is Siret | isSiret | 
| `isBic` | Field is BIC | isBic | 
| `isUrl` | Field is Siret | isUrl | 
| `isIban` | Field is IBAN | isIban | 
| `isInteger` | Value must be integer | isInteger | 
| `isChecked` | Field must be checked | isChecked | 
| `isPassword` | Field must be an acceptable password (watch your regex!) | isPassword | 
| `isEqual_{condition}` | Field with specified name must have same value | isEqual_#password1 | 
| `isLen_{condition}` | Value length equal to condition | isLen_4 | 
| `isNumeric` | Any valid number | isNumeric | 
| `minLen_{condition}` | Value length must be equal or more then contition | minLen_4 | 
| `maxLen_{condition}` | Value length must be equal or less then contition  | maxLen_34 | 
| `min_{condition}` | Value must be equal or more then contition | min_4 | 
| `max_{condition}` | Value must be equal or less then contition  | max_34 | 
| `radioIsChecked` | One radio input must be checked  | radioIsChecked | 
| `fileHasExtension` | File should have allowed extension  | fileHasExtension | 


### Default regex

| Key | Regex |
|-----|-------|
| isName | /\d/ |
| isEmail | /^[a-zA-Z0-9._+-]+@[a-z0-9-]{1,67}\.[a-zA-Z]{2,67}$/ |
| isPhone | /^0[1-9]{1}(([0-9]{2}){4})|((\s[0-9]{2}){4})|((-[0-9]{2}){4})$/ |
| isIban | /^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/ |
| isBic | /([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)/ |
| stringRegexp | /^\s+|<|>|"|\$|&|\/|'|\*|#|@|\\|\.\.|\./ |
| isUrl | /^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU|fr|Fr|it|eng|ca)$/ |
| isPassword | /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%_*?&])[A-Za-z\d$@$_!%*?&]{6,12}/ |
| msgRegexp | /^\s+$/ |
| isNumeric | /^[0-9]+$/ |
| isSiret | /^[0-9]{3}[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{5}$/ |


### Default error messages

| Key | Message |
|-----|---------|
| isEmail | 'Please enter a valid email adress' |
| isPhone | 'Please enter a valid phone number' |
| isUrl | 'Please enter a valid url' |
| isChecked | 'This field must be checked' |
| isIban | 'Your IBAN is invalid' |
| isSiret | 'Your Siret is invalid' |
| isBic | 'Your BIC is invalid' |
| isRequired | 'This field is required' |
| isNumeric | 'Value must be set to a number' |
| isInteger | 'Value must be an integer' |
| isEqual | 'Value must match {{cond}} field' |
| isLen | 'Value must contain {{cond}} characters' |
| isPassword | 'Password shoud contain 6 to 12 characters, numbers, at least one special character(@$_!%*?&), and at least one uppercase character and one lowercase' |
| minLen | 'Value is too short, minimum is {{cond}} characters' |
| maxLen | 'Value is too long, maximum is {{cond}} characters' |
| min | 'Value is too small, minimum is {{cond}}' |
| max | 'Value is too big, maximum is {{cond}}' |
| quantity | 'Use digits only' |
| radioIsChecked | 'You must checked one field at least' |
| fileHasExtension | 'Your file is invalid, this extension is not allowed' |


### TODO:
 - unit test => 1/???
 - allow custom validators => 1/3
 - allow validation by field (on 'input', 'keyup' or other events) => 1/2
 - allow custom errors messages => 1/2
 - allow custom regexp validators => 1/2
 - allow success message
 - support multiple radio input => 1/2
 - complete README
