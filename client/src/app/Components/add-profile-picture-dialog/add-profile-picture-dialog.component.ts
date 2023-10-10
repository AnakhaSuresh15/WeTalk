import { Token } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { FileUploadService } from 'src/app/Services/file-upload.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-add-profile-picture-dialog',
  templateUrl: './add-profile-picture-dialog.component.html',
  styleUrls: ['./add-profile-picture-dialog.component.css']
})
export class AddProfilePictureDialogComponent implements OnInit {
  profilePicToUpload?: File;
  username?: string;
  constructor(private dialogRef: MatDialogRef<ChatComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private fileUploadService: FileUploadService) { 
      this.username = data?.username;
    }

  ngOnInit(): void {
  }
  handleFileInput(event: any) {
    this.profilePicToUpload = event.target.files[0];
  }
  setProfilePic() {
    if(this.profilePicToUpload && this.username) {
      this.fileUploadService.uploadFile(this.profilePicToUpload, this.username);
    }
  }
}
