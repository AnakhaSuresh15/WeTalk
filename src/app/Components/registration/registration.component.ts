import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/Services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  user: any = {};
  fname?: string;
  lname?: string;
  uname?: string;
  pword1?: string;
  pword2?: string;
  registerClicked: boolean = false;
  constructor(private fb: FormBuilder,
    private regService: RegistrationService) { }

  ngOnInit() {
    this.createRegistrationForm();
  }
  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      uname: ['', Validators.required],
      pword1: ['', [Validators.required, Validators.minLength(8)]],
      pword2: ['', Validators.required],
    },{validators: this.passwordMatchingValidator});
  }
  passwordMatchingValidator(fg: FormGroup): Validators | null{
    return fg.get('pword1')?.value === fg.get('pword2')?.value ? null :
    {notmatched: true};
  }
  onRegister(){
    this.registerClicked = true;
    console.log(this.registrationForm.value);
    this.user = Object.assign(this.user, this.registrationForm.value);
    this.regService.addUser(this.user);
    this.registrationForm.reset();
  }
}
