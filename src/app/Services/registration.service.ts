import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8000/userdata').pipe(take(1)).subscribe((res: any) => {
      this.usernamesList = res.map(function (obj: any) {
        return obj.uname;
      });
    });
    this.http.get('http://localhost:8000/userdata').pipe(take(1)).subscribe((res: any) => {
      console.log(res);
    });
   }
  usernamesList: string[] = [];
  patternCheck(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null as any;
      }
      const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$');
      const valid = regex.test(control.value);
      return valid ? null as any : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors?.['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
      return null;
    }
  }

  userNameCheck(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        if (this.validateUserName(userControl.value)) {
          resolve({ userNameNotAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  validateUserName(userName: string) {
    return (this.usernamesList.indexOf(userName) > -1);
  }

  /*getUsernamesList(){
    return this.http.get('http://localhost:8000/usernamesList');
  }
  getUserData(){
    return this.http.get('http://localhost:8000/userData');
  }*/
}