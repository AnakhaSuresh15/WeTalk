import { Component, OnInit } from '@angular/core';
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
    this.users?.push(this.userModel);
    this.router.navigate(['/login']);
  }

}
