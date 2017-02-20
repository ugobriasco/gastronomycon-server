import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

  constructor() { }

  static getValidationErrorMessage(name: string, value: any){
  	let config =  {
  		'required': 'Required',
  		'invalidEmail':'Invalid email address',
  		'invalidPassword':'Invalid password. It must be at least 6 character long, and contain a number.',
  		'invalidCreditCard': 'Is invalid credit card number',
  		'minLength': `Minimum length ${value.requiredLength}` 
  	};
  	return config[name];
  }

  emailValidator(control){
  	//RFC 2822 compilant regex
  	if(control.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
  		return true;
  	} else {
  		return false;
  	}
  }


  passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return true;
        } else {
            return false;
        }
    }


    creditCardValidator(control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return true;
        } else {
            return false;
        }
    }



}
