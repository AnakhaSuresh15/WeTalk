import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/Services/registration.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userModel = new User('','','','','');
  users?: any[];
  constructor(private router: Router,
    private registrationService: RegistrationService) { }

  ngOnInit() {}
  onSubmit(){
    console.log(this.userModel);
    this.users?.push(this.userModel);
    this.registrationService.addUserName(this.userModel.uname);
    this.router.navigateByUrl('/login');
  }
}
