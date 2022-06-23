import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationService } from './Services/registration.service';
import { PasswordPatternDirective } from './Directives/password-pattern.directive';
import { MatchPasswordDirective } from './Directives/match-password.directive';
import { ValidateUserNameDirective } from './Directives/validate-user-name.directive';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatComponent } from './Components/chat/chat.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { AddToContactsDialogComponent } from './Components/add-to-contacts-dialog/add-to-contacts-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        LoginComponent,
        PasswordPatternDirective,
        MatchPasswordDirective,
        ValidateUserNameDirective,
        PageNotFoundComponent,
        AlertDialogComponent,
        ChatComponent,
        AddToContactsDialogComponent,
    ],
    entryComponents: [AlertDialogComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
    ],
    providers: [RegistrationService],
    bootstrap: [AppComponent]
})
export class AppModule { }
