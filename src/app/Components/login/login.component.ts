import { Component, OnInit } from '@angular/core';
import { Logindata } from 'src/app/logindata';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from 'src/app/Services/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logindata = new Logindata('','');
  userData: any;
  invalidError = false;
  dataFound = false;
  constructor(private http: HttpClient,
    private registrationService: RegistrationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.http.get('http://localhost:8000/userdata').pipe(take(1)).subscribe((res: any) => {
      this.userData = res;
      console.log(this.userData); 
      this.userData.forEach( (obj: any) => {
        if(obj.uname===this.logindata.uname && obj.pword1===this.logindata.pword){
          console.log('logged in!');
          this.dataFound = true;
        } 
      });
      if(!this.dataFound) {
        this.invalidError = true;
        console.log('error');
      }
    });
    /*this.userData.forEach( (obj: any) => {
      if(obj.uname===this.logindata.uname && obj.pword1===this.logindata.pword){
        console.log('logged in!');
        this.dataFound = true;
      } 
    });
    if(!this.dataFound) {
      this.invalidError = true;
      console.log('error');
    }*/
  } 
}
