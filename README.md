# Form Validation with Javascript (es6+)

###Validators:

|Name|Description|Example|
|---|---|---|---|
|`isRequired`|Field isn't empty|isRequired|
|`isEmail`|Field is email|isEmail|
|`isSiret`|Field is Siret|isSiret|
|`isBic`|Field is BIC|isBic|
|`isUrl`|Field is Siret|isUrl|
|`isIban`|Field is IBAN|isIban|
|`isInteger`|Value must be integer|isInteger|
|`isChecked`|Field must be checked|isChecked|
|`isPassword`|Field must be an acceptable password (watch your regex!)|isPassword|
|`isEqual_{condition}`|Field with specified name must have same value|isEqual_#password1|
|`isLen_{condition}`|Value length equal to condition|isLen_4|
|`isNumeric`|Any valid number|isNumeric|
|`minLen_{condition}`|Value length must be equal or more then contition|minLen_4|
|`maxLen_{condition}`|Value length must be equal or less then contition |maxLen_34|
|`min_{condition}`|Value must be equal or more then contition|min_4|
|`max_{condition}`|Value must be equal or less then contition |max_34|
|`radioIsChecked`|One radio input must be checked |radioIsChecked|
|`fileHasExtension`|File should have allowed extension |fileHasExtension|

###TODO
 - unit test
 - allow custom validators
 - allow custom errors messages => OK
 - allow custom regexp validators => OK