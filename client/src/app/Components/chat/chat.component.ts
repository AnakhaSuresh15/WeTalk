import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger} from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { RegistrationService } from 'src/app/Services/registration.service';
import { User } from 'src/app/user';
import { AddToContactsDialogComponent } from '../add-to-contacts-dialog/add-to-contacts-dialog.component';
import { ChatService } from 'src/app/Services/chat.service';
import { Message } from 'src/app/message';
import { AddProfilePictureDialogComponent } from '../add-profile-picture-dialog/add-profile-picture-dialog.component';
import { FirebaseApp } from 'firebase/app';
import { Database  } from "firebase/database";
import { FormGroup } from '@angular/forms';
import { ConfirmLogoutDialogComponent } from '../confirm-logout-dialog/confirm-logout-dialog.component';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  dialogConfig: any;
  contact: string = "";
  currentUsername?: any;
  contactUsernameList: any[] = [];
  contactList: User[] = [];
  userData: any;
  chatUserdata: any;
  selectedContact?: User;
  searchWord?: string;
  fnameList: string[] = [];
  lnameList: string[] = [];
  searchList: User[] = [];
  lowercaseUserData: any = [];
  lowercaseObject = new User('','','','','');
  newMessage?: string;
  messageList: Message[] = [];
  loggedUser?: string;
  receiver?: string;
  proPic: any;
  innerWidth: any;
  mobileView: boolean = true;
  app?: FirebaseApp;
  db?: Database;
  form?: FormGroup;
  showLeftPanelMobile = true;
  currentProPic = 'files0.032984442588890994%5Bobject%20File%5D?alt=media&token=dd4f44f7-6a83-45ec-a5a6-edbfa9af58aa';
  @ViewChild(MatMenuTrigger) triggerMenu!: MatMenuTrigger;
  constructor(private registrationService: RegistrationService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public http: HttpClient,
    public chatService: ChatService,) {
      if(!localStorage.getItem('userData') || localStorage.getItem('userData') === 'null' || localStorage.getItem('userData') === 'undefined') {
        registrationService.getUserData().pipe(take(1)).subscribe(data => {
          this.userData = data;
          localStorage.setItem('userData', JSON.stringify(this.userData));
          this.currentUsername = this.route.snapshot.paramMap.get('currentUsername');
          this.getContact();
          this.userData.forEach((element: any) => {
            if(element.uname === this.currentUsername) {
              this.currentProPic = element.profilepic;
              return true;
            }
            return false;
          });
        });
      }
      else {
        this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
        this.currentUsername = this.route.snapshot.paramMap.get('currentUsername');
        if(this.userData) {
          this.getContact();
          this.userData.forEach((element: any) => {
            if(element.uname === this.currentUsername) {
              this.currentProPic = element.profilepic;
              return true;
            }
            return false;
          });
        }
      }
    }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.mobileView = (this.innerWidth<800) ? true : false;
    this.chatService.getNewMessage().subscribe((data: any) => {
      const obj = JSON.parse(JSON.stringify(data));
      this.receiver = obj.receiver;
      this.messageList.push(obj);
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.mobileView = (this.innerWidth<800) ? true : false;
  }
  getContact() {
    this.http.get('https://wetalk-cfuy.onrender.com/contacts/'+this.currentUsername).pipe(take(1)).subscribe((res: any) => {
        const contactData = res;
        this.contactUsernameList = contactData.map(function(obj: any) {
          return obj.contact;
        });
        this.contactList = this.userData.filter((obj: any) => this.contactUsernameList.includes(obj.uname));
        JSON.stringify(this.contactList);
    });
  }
  addToContacts() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '300px';
    dialogConfig.width = '400px';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = { contact: this.contact }
    const dialogRef = this.dialog.open(AddToContactsDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.contact = result.data;
      if(this.contact !== undefined) {
        this.registrationService.addContact(this.currentUsername, this.contact).subscribe((res: any) => {
          this.getContact();
        });
      }
    });
  }
  setSelectedContact(selectedContact: User) {
    this.selectedContact = selectedContact;
    if(this.mobileView) this.showLeftPanelMobile = false;
  }
  search() {
    this.searchList = [];
    const keyWord = this.searchWord?.toLocaleLowerCase();
    this.userData.forEach((element: any) => {
      if(element.fname.toLocaleLowerCase().indexOf(keyWord) > -1 || element.lname.toLocaleLowerCase().indexOf(keyWord) > -1 || element.uname.toLocaleLowerCase().indexOf(keyWord) > -1) {
        this.searchList.push(element);
      }
    });
  }
  sendMessage() {
    this.chatService.sendMessage(this.newMessage, this.selectedContact?.uname, this.currentUsername);
    this.newMessage = '';
  }
  addProfilePic() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '300px';
    dialogConfig.width = '200px';
    dialogConfig.panelClass = 'custom-dialog-container';
    dialogConfig.data = { username: this.currentUsername }
    const dialogRef = this.dialog.open(AddProfilePictureDialogComponent, {
      data: {
        username: this.currentUsername
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.proPic = result.data;
      if(this.proPic !== undefined) {
      }
    });
  }
  logout() {
    this.dialog.open(ConfirmLogoutDialogComponent);
  }
  displayLeftPanelMobile() {
    this.showLeftPanelMobile = true;
  }
}
