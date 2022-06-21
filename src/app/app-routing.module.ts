import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from 'src/app/Components/registration/registration.component';
import { LoginComponent } from 'src/app/Components/login/login.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { LoginAlertComponent } from './Components/login/login-alert/login-alert.component';

const routes: Routes = [
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: '',   redirectTo: '/register', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [RegistrationComponent, LoginComponent]
