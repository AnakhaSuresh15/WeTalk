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
  data =  new User('','','','','');
  constructor(private router: Router,
    private registrationService: RegistrationService) { }

  ngOnInit() {}
  onSubmit() {
    this.data = this.userModel;
    delete this.data.pword2;
    console.log(this.data);
    this.registrationService.insertUserData(this.data).subscribe((res: any) => {
      return true;
    });
    this.router.navigate(['/login']);
  }
}
