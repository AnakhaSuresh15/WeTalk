import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-add-profile-picture-dialog',
  templateUrl: './add-profile-picture-dialog.component.html',
  styleUrls: ['./add-profile-picture-dialog.component.css']
})
export class AddProfilePictureDialogComponent implements OnInit {
  profilePicToUpload: File | null = null;
  constructor(private dialogRef: MatDialogRef<ChatComponent>) { }

  ngOnInit(): void {
  }
  browseForPofilePic() {

  }
  setProfilePic() {

  }
  handleFileInput(event: any) {
    this.profilePicToUpload = event.target.files[0];
  }
}
