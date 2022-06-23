import { Directive, ElementRef, forwardRef, Input } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { RegistrationService } from '../Services/registration.service';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appValidateUserName]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: forwardRef(() => ValidateUserNameDirective), multi: true }]

})
export class ValidateUserNameDirective implements Validator {
  @Input() appValidateUserName?: string;

  constructor(private registrationService: RegistrationService,) { }

  validate(control: AbstractControl): Promise<{ [key: string]: any } | unknown> | Observable<{ [key: string]: any }> | null {
    if(this.appValidateUserName==='userNameCheck') {
      return this.registrationService.userNameCheck(control);
    } else if(this.appValidateUserName==='userNameAvailableCheck') {
      return this.registrationService.userNameAvailableCheck(control);
    } else {
      return null;
    }
  }
}