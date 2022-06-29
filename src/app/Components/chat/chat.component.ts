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

const SOCKET_ENDPOINT = 'localhost:3000';
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
  @ViewChild(MatMenuTrigger) triggerMenu!: MatMenuTrigger;
  constructor(private registrationService: RegistrationService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public http: HttpClient,
    public chatService: ChatService,) {
      if(localStorage.getItem('userData') === null) {
        registrationService.userapiData$.pipe(take(1)).subscribe(data => this.userData = data);
        localStorage.setItem('userData', JSON.stringify(this.userData));
      }
      this.currentUsername = this.route.snapshot.paramMap.get('currentUsername');
    }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData')!);
    this.getContact();
    this.chatService.getNewMessage().subscribe((data: any) => {
      const obj = JSON.parse(JSON.stringify(data));
      console.log(this.selectedContact);
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
    dialogConfig.panelClass = 'custom-dialog-container';
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

 /* sendMessage() {
    this.socket.emit('message', this.sendMsg);
    const element = document.createElement('li');
    element.innerHTML = this.sendMsg;
    element.style.background = '#EFF3FA';
    element.style.padding = '5px 10px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('messages')?.appendChild(element);
    this.sendMsg = '';
  }*/
  /*selectedMenu(menuItem: any){
  }*/
}
