import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from './Services/registration.service';
import { AlertModule } from 'ngx-bootstrap/alert';
import { PasswordPatternDirective } from './Directives/password-pattern.directive';
import { MatchPasswordDirective } from './Directives/match-password.directive';
import { ValidateUserNameDirective } from './Directives/validate-user-name.directive';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginAlertComponent } from './Components/login/login-alert/login-alert.component';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    PasswordPatternDirective,
    MatchPasswordDirective,
    ValidateUserNameDirective,
    PageNotFoundComponent,
    LoginAlertComponent,
    AlertDialogComponent,
  ],
  entryComponents: [AlertDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
