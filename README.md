![Install and Tests](https://github.com/jeremN/formControl/workflows/Install%20and%20Tests/badge.svg)

# Form Validation with Javascript (es6+)

### Install
```
npm i @jeremn/form-control-js
import formControl from '@jeremn/form-control-js'
```

### Usage
**formControl** take three arguments:

- forms: an `array` containing all yours forms object, set to null by default (see [Forms](#forms-property)).

```javascript
const forms = [
  {
    form: '.js__form__control--1',
    validate: '',
    fields: [
      {
        field: '#name',
        errorsMsg: {
          isRequired: 'my cutom error message',
          minLen: 'my cutom error message',
          maxLen: 'my cutom error message',
        },
        isRequired: true,
        minLen: 4,
        maxLen: 12,
      }, {
        field: '#number',
        isRequired: true,
      }, {
        field: '#phone',
        isPhone: true,
      }, {
        field: '#email',
        isEmail: true,
      }, {
        field: '#siret',
        isSiret: true,
      }, {
        field: '#bic',
        isBic: true,
      }, {
        field: '#iban',
        isIban: true,
      }, {
        field: '#url',
        isUrl: true,
      }, {
        field: '#checking',
        isChecked: true,
      },
    ]
  }, {
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
```

- config: an `object` containing your properties, custom validators, errors messages... that will overwrite the default settings (see [Config object](#config-property)).

- useDateAttr: a `boolean`, telling formControl to use data-attr or not, set to true by default.

### FormControl

1. Using data-attributes

You can use data-attributes to initialize formControl, see [Data-attributes](#data-attributes) below.

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

2. Using forms array

Or you can use forms array to initialize formControl, see [Forms](#forms-property) below.

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

You can add your own validator by:
- adding an object in customValidators in the config object

```javascript
const customState = {
  customValidators: {
    myCustomValidator: (value) => { 
      return value != "2"
    }
  }, 
  errorsMsg: {
    isNotEqualTwo: 'Field should not be equal to two'
  }
}
```
then add the corresponding data-attr:

```html
<input data-form-validators="myCustomValidatorName"/>
```
or in the field object:

```javascript
<input data-form-validators="myCustomValidatorName"/>
```

- or add in field object your validator

```javascript
const forms = [
  {
    form: '.js__form-control',
    fields: [
      {
        field: '#text4',
        myCustomValidator: (value) => {
          return value === 'hello'
        },
      },
    ]
  }
]    
```
in both case, don't forget to add the corresponding error message.


4. Adding custom error message

You can add custom error message:
- by setting a `data-attr`

```html
<input id="text2" class="form__field" type="text" data-error-msg-is-not-equal-two="Field should not be equal to two" />
```

- by using the `errorsMsg` key in config

```javascript
const customState = {
  ...
  }, 
  errorsMsg: {
    myCustomErrorMsg: 'My error message'
  }
}
```
- by using the `errorMsg` key in field object

```javascript
const forms = [
  {
    form: '.js__form-control',
    fields: [
      {
        field: '#text4',
        errorMsg: {
          myCustomErrorMsg: 'My error message'
        }  
      }
    ],
  }
]
```

5. Changing event type

By default `formControl` perform validation when the form is submitted,
you can use the `onFields` validation type if you want to perform 'live' validation when a user type in an input field.

To do this, set `validationType` key in config with the value: `onFields`

```javascript
const config = {
  validationType: 'onFields'
}
```

or use `validate` key in form object:

```javascript
const forms = [
  {
    form: '#myFormID',
    validate: 'onFields',
    ...
  }
]
```

by default `input` event listener will be used, to change this behavior, you can:
- add the `evtType` key in field object

```javascript
const forms = [
  {
    ...,
    fields: [ 
      {
        field: '.myField',
        evtType: 'keyup'
      }
    ]
  }
]
```

6. Adding custom classes

You can set custom CSS classes for field and error text block by passing an object as the config argument (see [Config object](#config-property) below for the used properties).

7. Ajax form

If you need form that send data by ajax you can set callback `afterValidation`. It will be called only if form is valid and afterValidation is a function.
Two arguments will be passed, the current form, and the corresponding fields array.

```javascript
let validation = formControl(null, {
  afterValidation: (currentForm, fields) {
    '...your code here'
  }
});
```


### <a id="forms-property">Forms</a>

| Name | Type | Description | Default (if applicable) | Example |
|------|------|-------------|-------------------------|---------|
| `form` | String | Form selector (ID, className...) |  | '.js__form__control--1' |
| `validate` | String | Validation type used by FormControl (two possible value: 'onSubmit', 'onFields') | 'onSubmit' | 'onSubmit' |
| `fields` | Array | Fields to validate |  | [{ field: '#number', isRequired: true }, {...}] |


### <a id="field-object">Field object</a>

| Name | Type | Description | Example |
|------|------|-------------|---------|
| `field` | String | Input selector (ID, className...) | '#name' |
| `validatorsName` | Boolean or Value or String | Validator applied to field (see Validators below) | minLen: 4 |
| `errorsMsg` | Object | Custom errors message | errorsMsg: { minLen: 'my custom error msg {{cond}}' } |
| `evtType` | String | Event applied to field event listener (if validationType = 'onFields') | evtType: 'keyup' | 


### <a id="config-property">Config</a>

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


### <a id="data-attributes">Data-attributes</a>

| Name | Description | Example |
|------|-------------|---------|
| `[data-form-control="true"]` | Form with this data-attr will be processed by FormControl | '<form [data-form-control="true"]></form>'
| `[data-form-validators]` | Apply validation rules on input | '<input type="text" data-form-validators="isRequired minLen_4"/>' |
| `[data-validation-type]` | Modify validator event listener on form | '<form data-validation-type="onSubmit"></form>' |
| `[data-event-type]` | Apply custom event listener on input event listener | '<input type="text" data-event-type="keyup"/>' |
| `[data-error-msg-my-validator-name]` | Apply custom error message on input | '<input type="text" data-error-msg-is-required="my custom error message"/>' |


### <a id="validators">Validators</a>

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
 - support multiple radio input => 1/2
 - complete README
 - accessibility
