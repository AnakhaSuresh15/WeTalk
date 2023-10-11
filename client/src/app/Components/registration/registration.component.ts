import { Component, OnInit, Renderer2 } from '@angular/core';
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
  innerWidth: any;
  mobileView: boolean = false;
  constructor(private router: Router,
    private registrationService: RegistrationService,
    private renderer: Renderer2) { }

  ngOnInit() {}
  
  ngAfterViewInit() {
    this.renderer.selectRootElement('#fname').focus();
  } 

  onSubmit() {
    this.data = this.userModel;
    this.data.profilepic = 'files0.032984442588890994%5Bobject%20File%5D?alt=media&token=dd4f44f7-6a83-45ec-a5a6-edbfa9af58aa';
    delete this.data.pword2;
    console.log(this.data);
    this.registrationService.insertUserData(this.data).subscribe((res: any) => {
      return true;
    });
    this.router.navigate(['/login']);
  }
}
