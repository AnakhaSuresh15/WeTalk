import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistrationService } from 'src/app/Services/registration.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-add-to-contacts-dialog',
  templateUrl: './add-to-contacts-dialog.component.html',
  styleUrls: ['./add-to-contacts-dialog.component.css']
})
export class AddToContactsDialogComponent implements OnInit {
  data: any =  { contact : ''};
  currentUsername?: string;
  sameName: boolean= false;
  constructor(private registrationService: RegistrationService,
    private dialogRef: MatDialogRef<ChatComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.data.contact = data?.contact;
    this.currentUsername = this.registrationService.getCurrentUsername();
    console.log(this.currentUsername);
    }

  ngOnInit(): void {
  }
  addYourselfCheck() {
    if(this.data.contact===this.currentUsername) {
      this.sameName = true;
    }
    else {
      this.sameName = false;
    }
  }
  add() {
    this.dialogRef.close({ data : this.data.contact });
  }
}
