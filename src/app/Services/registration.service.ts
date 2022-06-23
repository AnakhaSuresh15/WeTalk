import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { UntypedFormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  usernamesList: string[] = [];
  currentUsername?: string;
  private userapiData = new BehaviorSubject<any>(null);
  public userapiData$ = this.userapiData.asObservable();
  constructor(private http: HttpClient) {
    this.getUsernamesList();
   }

  getUsernamesList() {
    this.http.get('http://localhost:8000/userdata').pipe(take(1)).subscribe((res: any) => {
      this.usernamesList = res.map(function (obj: any) {
        return obj.uname;
      });
    });
  }
  patternCheck(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        return null as any;
      }
      const regex = new RegExp('^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$');
      const valid = regex.test(control.value); 
      return valid ? null as any : { invalidPassword: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: UntypedFormGroup) => {
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

  userNameAvailableCheck(userControl: AbstractControl) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(this.validateUserName(userControl.value));
        if (!this.validateUserName(userControl.value) || this.validateSameUsername(userControl.value)) {
          resolve({ userNameAvailable: true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }
  setCurrentUsername(currentUsername: any) {
    this.currentUsername = currentUsername;
  }
  getCurrentUsername() {
    return this.currentUsername;
  }
  validateUserName(userName: string) {
    return (this.usernamesList.indexOf(userName) > -1);
  }
  validateSameUsername(userName: string) {
    return (this.getCurrentUsername()===userName);
  }
  insertUserData(userModel: any) {
    return this.http.post('http://localhost:8000/adduser', userModel);
  }
  getUserData() {
    return this.http.get('http://localhost:8000/userdata').pipe(map((res: any) => {
      return res;
    }));
  }
  setUserData(data: any) { 
    this.userapiData.next(data);
  }
  addContact(username: any, contact: any) {
    return this.http.post('http://localhost:8000/addcontact', { username, contact });
  }
}