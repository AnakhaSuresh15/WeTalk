import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-add-to-contacts-dialog',
  templateUrl: './add-to-contacts-dialog.component.html',
  styleUrls: ['./add-to-contacts-dialog.component.css']
})
export class AddToContactsDialogComponent implements OnInit {
  data: any =  { contact : ''};
  constructor(private dialogRef: MatDialogRef<ChatComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.data.contact = data?.contact;
    }

  ngOnInit(): void {
  }
  add() {
    this.dialogRef.close({ data : this.data.contact });
  }
}
