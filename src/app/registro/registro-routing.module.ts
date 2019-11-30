import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroComponent } from './signin/registro.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: RegistroComponent },
  { path: 'signin', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
