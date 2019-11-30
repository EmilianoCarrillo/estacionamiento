import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './signin/registro.component';

import { RouterModule } from '@angular/router';
import { NbIconModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { NbToastrModule } from '@nebular/theme';

import { 
  NbButtonModule,
  NbCheckboxModule,
  NbCardModule,
  NbLayoutModule,
  NbInputModule,

} from '@nebular/theme';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [RegistroComponent, LoginComponent],
  imports: [
    CommonModule,
    RegistroRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    NbIconModule,
    RouterModule, 
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    NbLayoutModule,
    NbInputModule,
    NbToastrModule.forRoot(),
  ]
})
export class RegistroModule { }
