import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';
import { RegistrationService } from '../Services/registration.service';

@Directive({
  selector: '[appMatchPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true }]
})
export class MatchPasswordDirective implements Validator {
  @Input('appMatchPassword') MatchPassword: string[] = [];

  constructor(private registrationService: RegistrationService) { }

  validate(formGroup: FormGroup): ValidationErrors | null {
    return this.registrationService.MatchPassword(this.MatchPassword[0], this.MatchPassword[1])(formGroup);
  }
}