import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { RegistrationService } from 'src/app/Services/registration.service';
import { User } from 'src/app/user';
import { AddToContactsDialogComponent } from '../add-to-contacts-dialog/add-to-contacts-dialog.component';
import * as io from 'socket.io-client';
import { ChatService } from 'src/app/Services/chat.service';
import { Message } from 'src/app/message';
import { AddProfilePictureDialogComponent } from '../add-profile-picture-dialog/add-profile-picture-dialog.component';

const SOCKET_ENDPOINT = '128.199.26.70:3000';
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
  messageList: any[] = [];
  loggedUser?: string;
  receivingUser?: string;
  proPic: any;
  @ViewChild(MatMenuTrigger) triggerMenu!: MatMenuTrigger;
  constructor(private registrationService: RegistrationService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public http: HttpClient,
    public chatService: ChatService,) {
      if(localStorage.getItem('userData') === 'null' || localStorage.length === 0) {
        registrationService.getUserData().pipe(take(1)).subscribe(data => this.userData = data);
        //registrationService.userapiData$.pipe(take(1)).subscribe(data => this.userData = data);
        //this.userData.forEach(function(item: any){ delete item.pword1 });
        localStorage.setItem('userData', JSON.stringify(this.userData));
      }
      else {
        this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
      }
      this.currentUsername = this.route.snapshot.paramMap.get('currentUsername');
    }

  ngOnInit(): void {
    this.getContact();
    this.chatService.getNewMessage().subscribe((data: any) => {
      const obj = JSON.parse(JSON.stringify(data));
      this.receivingUser = obj.receivingUser;
      this.messageList.push(obj);
    });
    /*this.chatService.getUser().subscribe((data: any) => {
      const obj = JSON.parse(JSON.stringify(data));
      this.loggedUser = obj.currentuser;
      this.selectedUser =  obj.selecteduser;
    });*/
  }
  getContact() {
    this.http.get('http://localhost:8000/contacts/'+this.currentUsername).pipe(take(1)).subscribe((res: any) => {
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
    //this.chatService.setUser(this.selectedContact.uname);
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
    //dialogConfig.data = { contact: this.contact }
    const dialogRef = this.dialog.open(AddProfilePictureDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.proPic = result.data;
      if(this.proPic !== undefined) {
        /*this.registrationService.addContact(this.currentUsername, this.contact).subscribe((res: any) => {
          this.getContact();
        });*/
      }
    });
  }
}
