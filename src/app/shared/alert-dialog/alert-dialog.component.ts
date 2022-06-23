import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from 'src/app/Components/login/login.component';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})

export class AlertDialogComponent implements OnInit {
  title: any;
  content: any;
  buttonText: any;
  constructor(private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.title = data.title;
    this.content = data.content;
    this.buttonText = data.buttonText;
    }

  ngOnInit(): void {
  }

}
