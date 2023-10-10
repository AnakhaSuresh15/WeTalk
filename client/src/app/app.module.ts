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
import { ChatService } from './Services/chat.service';
import { AddProfilePictureDialogComponent } from './Components/add-profile-picture-dialog/add-profile-picture-dialog.component';
import { FileUploadService } from './Services/file-upload.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { DatePipe } from '@angular/common';
import { ConfirmLogoutDialogComponent } from './Components/confirm-logout-dialog/confirm-logout-dialog.component';


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
        AddProfilePictureDialogComponent,
        ConfirmLogoutDialogComponent,
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
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyCgdQF6mwRahRVe8Iax_qF5PJWCy1gKNW8",
            authDomain: "wetalk-firebase.firebaseapp.com",
            projectId: "wetalk-firebase",
            storageBucket: "wetalk-firebase.appspot.com",
            messagingSenderId: "615099533186",
            appId: "1:615099533186:web:ecdaccacd46f494d0ff19b"
        }),
        AngularFireStorageModule
    ],
    providers: [RegistrationService,
                ChatService,
                FileUploadService,
                DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule { }
