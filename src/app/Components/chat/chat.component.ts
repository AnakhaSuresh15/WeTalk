import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { RegistrationService } from 'src/app/Services/registration.service';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { User } from 'src/app/user';
import { AddToContactsDialogComponent } from '../add-to-contacts-dialog/add-to-contacts-dialog.component';

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
  userData: any = [];
  selectedContact?: User;
  @ViewChild(MatMenuTrigger) triggerMenu!: MatMenuTrigger;
  constructor(private registrationService: RegistrationService,
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public http: HttpClient,) {
      registrationService.userapiData$.pipe(take(1)).subscribe(data => this.userData = data);
      this.currentUsername = this.route.snapshot.paramMap.get('currentUsername');
    }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/contacts').pipe(take(1)).subscribe((res: any) => {
        const contactData = res;
        contactData.forEach((obj: any) => {
          if(obj.username === this.currentUsername) {
            this.contactUsernameList.push(obj.contact);
          }
        });
        this.contactList = this.userData.filter((obj: any) => this.contactUsernameList.includes(obj.uname));
        JSON.stringify(this.contactList);
        console.log(this.contactList);
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
          this.reload();
        });
      }
    });
  }
  setSelectedContact(selectedContact: User) {
    this.selectedContact = selectedContact;
  }
  /*selectedMenu(menuItem: any){
  }*/
  reload(){
    window.location.reload();
  }
}
