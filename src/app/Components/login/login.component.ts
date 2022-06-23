import { Component, OnInit } from '@angular/core';
import { Logindata } from 'src/app/logindata';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from 'src/app/Services/registration.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logindata = new Logindata('','');
  userData: any;
  dataFound = false;
  constructor(private http: HttpClient,
    private registrationService: RegistrationService,
    private router: Router,
    public dialog: MatDialog,
    ) { 
      this.registrationService.getUserData().subscribe(data => {
        this.userData = data;
        this.registrationService.setUserData(data);
      });
    }

  ngOnInit(): void {

  }

  onSubmit() {
    //this.http.get('http://localhost:8000/userdata').pipe(take(1)).subscribe((res: any) => {
      //this.userData = res; 
    console.log(this.userData);
    for( var key in this.userData ) {
      var obj = this.userData[key];
      if(obj.uname===this.logindata.uname && obj.pword1===this.logindata.pword){
        this.dataFound = true;
        this.router.navigate(['/chat', { currentUsername: obj.uname }]);
        break;
      } 
    }
    if(!this.dataFound) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.hasBackdrop = true;
      dialogConfig.height = "180px";
      dialogConfig.width = "250px";
      dialogConfig.data = {
        title: 'Error',
        content: 'Invalid username or password',
        buttonText: 'Close'
      };
      dialogConfig.panelClass = 'custom-dialog-container';
      this.dialog.open(AlertDialogComponent, dialogConfig);
    }
  } 
}
