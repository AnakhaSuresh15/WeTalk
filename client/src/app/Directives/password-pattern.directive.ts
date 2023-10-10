import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { RegistrationService } from '../Services/registration.service';

@Directive({
  selector: '[appPasswordPattern]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordPatternDirective, multi: true }]
})
export class PasswordPatternDirective implements Validator {

  constructor(private registrationService: RegistrationService) { }

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.registrationService.patternCheck()(control);
  }
}