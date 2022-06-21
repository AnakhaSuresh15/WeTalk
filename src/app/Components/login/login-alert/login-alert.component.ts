import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-alert',
  templateUrl: './login-alert.component.html',
  styleUrls: ['./login-alert.component.css']
})
export class LoginAlertComponent implements OnInit {
  error: string = "Invalid username or password."
  constructor() { }

  ngOnInit(): void {
  }

}
