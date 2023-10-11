import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Logindata } from 'src/app/logindata';
import { RegistrationService } from 'src/app/Services/registration.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  logindata = new Logindata('','');
  userData: any;
  dataFound = false;
  constructor(private registrationService: RegistrationService,
    private router: Router,
    private renderer: Renderer2,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const elem = this.renderer.selectRootElement('#uname');
      elem.focus();
    }, 100);
  }

  onSubmit() {
    let params = {"username": this.logindata.uname, "password": this.logindata.pword};
    this.registrationService.getUserLoginValidation(params).subscribe((data: any) => {
        this.registrationService.setCurrentUsername(this.logindata.uname);
        this.router.navigate(['/chat', { currentUsername: this.logindata.uname }]);
    }, (error: any) => {
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
    });
  }
}
